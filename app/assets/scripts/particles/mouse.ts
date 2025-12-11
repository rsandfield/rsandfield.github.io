import { Vector2 } from "./vector2";

const MAX_AGE = 10;

export class Mouse {
    position: Vector2 = new Vector2(0, 0);
    age: number = MAX_AGE + 1; // Do not display at start

    updatePosition(event: MouseEvent, bounds: Vector2) {
        this.age = 0;

    }

    advance(duration: number) {
        this.age += duration;
    }

    draw() {
        if (this.age > MAX_AGE) {
            return
        }
    }
}