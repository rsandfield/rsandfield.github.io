import type { Vector2 } from "./vector2";

export class Particle {
    position: Vector2;
    velocity: Vector2;
    radius: number;
    color: string = 'green'
    age: number = 0;

    constructor(position: Vector2, velocity: Vector2, radius: number = 2) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
    }

    advance(duration: number, bounds: Vector2) {
        this.age += duration;
        this.position = this.position.add(this.velocity)
        if (this.position.x < 0) {
            this.position.x *= -1
            this.velocity.x *= -1
        }
        if (this.position.x > bounds.x) {
            this.position.x = bounds.x * 2 - this.position.x
            this.velocity.x *= -1
        }
        if (this.position.y < 0) {
            this.position.y *= -1
            this.velocity.y *= -1
        }
        if (this.position.y > bounds.y) {
            this.position.y = bounds.y * 2 - this.position.y
            this.velocity.y *= -1
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineWidth = this.radius * 2;
        ctx.strokeStyle = this.color;
        ctx.translate(this.position.x, this.position.y);
        ctx.beginPath();
        ctx.lineTo(-this.velocity.x, -this.velocity.y);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }
}