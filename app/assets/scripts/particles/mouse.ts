import { Vector2 } from "./vector2";

export class Mouse {
    active: boolean = false;
    position: Vector2 = new Vector2(0, 0);
    downPosition: Vector2 | null = null;
    age: number = 0;

    _get_position(event: MouseEvent, rect: DOMRect): Vector2 {
        return new Vector2(
            event.clientX - rect.left,
            event.clientY - rect.top
        );
    }

    mouseMove(event: MouseEvent, rect: DOMRect) {
        this.position = this._get_position(event, rect)
    }

    mouseDown(event: MouseEvent, rect: DOMRect) {
        this.downPosition = this._get_position(event, rect)
    }

    mouseUp(): Vector2 {
        if (!this.downPosition) {
            return new Vector2(0, 0);
        }
        const dir = this.position.subtract(this.downPosition);
        this.downPosition = null;
        return dir;
    }

    advance(duration: number) {
        this.age += duration;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) {
            return;
        }

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.strokeStyle = "green";

        if (this.downPosition) {
            const relDown = this.downPosition.subtract(this.position);
            ctx.rotate(relDown.angle())
            ctx.beginPath();
            ctx.arc(0, relDown.magnitude(), 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(0, 0, 5,Math.PI * 0.7, Math.PI * 1.3);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, 5, Math.PI * 1.7, Math.PI * 0.3);
            ctx.stroke();
            
            if (relDown.magnitude() > 10) {
                ctx.beginPath();
                ctx.ellipse(0, 20, 40, 20, 0, Math.PI * 1.1, Math.PI * 1.4);
                ctx.stroke();
                ctx.beginPath();
                ctx.ellipse(0, 20, 40, 20, 0, Math.PI * 1.6, Math.PI * 1.9);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(30, 15);
                ctx.lineTo(10, 20);
                ctx.moveTo(-30, 15);
                ctx.lineTo(-10, 20);
                ctx.stroke();
            
                ctx.setLineDash([5, 5])
                ctx.beginPath();
                ctx.moveTo(0, 10);
                ctx.lineTo(0, relDown.magnitude());
                ctx.stroke();
            }
        } else {
            ctx.rotate(this.age)
            const count = 6;
            for (let i = 0; i < count; i++){
                ctx.rotate(Math.PI * 2 / count);
                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, Math.PI / count);
                ctx.stroke();
            }
        }

        ctx.restore();
    }
}