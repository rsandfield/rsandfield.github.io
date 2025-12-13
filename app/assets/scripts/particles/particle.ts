import { parseColor, RGBtoCSS, type Color, type RGB } from "vuetify/lib/util/colorUtils.mjs";
import type { Vector2 } from "./vector2";

const G = 6.6743 * 10 ** 1; // Actually 10^-11 but that's too small to see here
const C = 10 ** 5;

export class Particle {
    position: Vector2;
    velocity: Vector2;
    radius: number = 2;
    mass: number = 1;
    color: RGB;
    age: number = 0;
    expired: boolean = false;

    constructor(position: Vector2, velocity: Vector2, mass: number = 5, color: Color | null = null) {
        this.position = position;
        this.velocity = velocity;
        this.setMass(mass);
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

    setMass(mass: number) {
        this.mass = mass;
        this.radius = mass ** (1/3);
    }
    
    interact(other: Particle, duration: number) {
        if (this.expired) {
            return;
        }
        const relative_position = this.position.subtract(other.position);
        const relative_velocity = this.velocity.subtract(other.velocity);
        const total_mass = this.mass + other.mass;
        const minimum_distance = this.radius + other.radius;
        if (relative_position.magnitude_squared() === 0) {
            return;
        } else if (relative_position.magnitude() < minimum_distance) {
            if (
                !other.expired &&
                this.mass >= other.mass &&
                relative_velocity.magnitude() < total_mass
            ) {
                // Merge
                this.velocity = this.velocity.scaled(this.mass / total_mass);
                this.position = this.position.subtract(relative_position.scaled(1 - (this.mass / total_mass)));
                this.setMass(total_mass);
                other.expired = true;
            } else {
                // Bounce
                this.velocity = this.velocity.add(
                    relative_position.normalized().scaled(10 * other.mass / this.mass)
                );
                this.position = this.position.add(
                    relative_position
                        .normalized()
                        .scaled((minimum_distance - relative_position.magnitude()) * other.radius / this.radius)
                );
            }
        }
        const attraction = relative_position.normalized()
            .scaled((total_mass) / this.mass)
            .scaled(1 / relative_position.magnitude_squared())
            .scaled(G)
            .scaled(duration);
        this.velocity = this.velocity.subtract(attraction);
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