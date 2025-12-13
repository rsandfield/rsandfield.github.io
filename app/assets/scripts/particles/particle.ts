import { parseColor, RGBtoCSS, type Color, type RGB } from "vuetify/lib/util/colorUtils.mjs";
import type { Vector2 } from "./vector2";

const C = 10 ** 5;

export class Particle {
    position: Vector2;
    velocity: Vector2;
    radius: number;
    color: RGB;
    age: number = 0;

    constructor(position: Vector2, velocity: Vector2, radius: number = 2, color: Color | null = null) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        if (color == null) {
            color = {
                h: Math.random() * 256,
                s: 1,
                v: 1,
                a: 1,
            }
        }
        this.color = parseColor(color);
    }

    advance(duration: number, bounds: Vector2) {
        this.age += duration;

        if (this.velocity.magnitude_squared() > C) {
            this.velocity = this.velocity.scaled(0.99);
        }

        this.position = this.position.add(this.velocity.scaled(duration));
        if (this.position.x < this.radius) {
            this.position.x = Math.abs(this.position.x) + this.radius
            this.velocity.x = Math.abs(this.velocity.x)
        } else if (this.position.x > bounds.x - this.radius) {
            this.position.x = (bounds.x - this.radius) * 2 - this.position.x
            this.velocity.x = -Math.abs(this.velocity.x)
        }
        if (this.position.y < this.radius) {
            this.position.y = Math.abs(this.position.y) + this.radius
            this.velocity.y = Math.abs(this.velocity.y)
        } else if (this.position.y > bounds.y - this.radius) {
            this.position.y = (bounds.y - this.radius) * 2 - this.position.y
            this.velocity.y = -Math.abs(this.velocity.y)
        }
    }
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineWidth = this.radius * 2;

        
        const v = this.velocity.magnitude() * 0.1;
        const a = this.velocity.angle();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(a);
        
        const linearGradient = ctx.createLinearGradient(0, 0, 0, -v);
        linearGradient.addColorStop(0, RGBtoCSS(this.color));
        const faded = {
            r: this.color.r,
            g: this.color.g,
            b: this.color.b,
            a: 0,
        };
        linearGradient.addColorStop(1, RGBtoCSS(faded))
        ctx.strokeStyle = linearGradient;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -v);
        ctx.stroke();
        ctx.closePath();
        
        ctx.lineWidth = 0;
        ctx.fillStyle = RGBtoCSS(this.color);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}