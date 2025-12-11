import { Vector2 } from "./vector2";
import { Particle } from "./particle";
import { Mouse } from "./mouse";

export class Display {
    canvas: HTMLCanvasElement;
    container: HTMLElement;
    ctx: CanvasRenderingContext2D;
    animationId: number = 0;

    particles: Particle[] = [];
    previous: DOMHighResTimeStamp;

    constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.container = container;
        this.previous = performance.now();

        this.particles.push(new Particle(new Vector2(0, 0), new Vector2(2, 1.75)));
        this.particles.push(new Particle(new Vector2(0, 0), new Vector2(1.1, 0.5)));
        this.startAnimation()
    }

    resize(entries: ResizeObserverEntry[]) {
        for (let entry of entries) {
            if (entry.target == this.container) {
                const { width, height } = entry.contentRect;
                this.canvas.width = width;
                this.canvas.height = height;
            }
        }
    }
    
    animate(timestamp: DOMHighResTimeStamp) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'green';
        let duration = timestamp - this.previous
        this.previous = timestamp
        const size = new Vector2(this.canvas.width, this.canvas.height)
        this.particles.forEach(particle => {
            particle.advance(duration, size);
            particle.draw(this.ctx);
        });
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    startAnimation() {
        if (!this.animationId) {
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        }
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = 0;
        }
    }
}