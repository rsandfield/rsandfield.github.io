import { Vector2 } from "./vector2";
import { Particle } from "./particle";

export class Display {
    canvas: HTMLCanvasElement;
    container: HTMLElement;
    ctx: CanvasRenderingContext2D;
    animationId: number = 0;

    particles: Particle[] = [];
    previous: DOMHighResTimeStamp = 0;

    constructor(canvas: HTMLCanvasElement, container: HTMLElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.container = container;
        this.createParticles(100);

        setInterval(() => {this.simulate()}, 1000 / 60.0);
        this.startAnimation()
    }

    resize(entries: ResizeObserverEntry[]) {
        for (const entry of entries) {
            if (entry.target == this.container) {
                const { width, height } = entry.contentRect;
                this.canvas.width = width;
                this.canvas.height = height;
            }
        }
    }

    createParticles(count: number) {
        const rect = this.canvas.getBoundingClientRect();
        const bounds = new Vector2(rect.x * 2.8, rect.y * 2.1);
        for(let i = 0; i < count; i++) {
            this.particles.push(new Particle(
                Vector2.random(bounds),
                Vector2.random().scaled(100),
                Math.random() * 5,
            ))
        }
    }

    simulate() {
        const timestamp = Date.now();
        if (!this.previous) {
            this.previous = timestamp;
            return;
        }

        const duration = (timestamp - this.previous) * 0.001;
        this.previous = timestamp;
        const size = new Vector2(this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.advance(duration, size);
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // console.log(this.particles[0]?.position, this.particles[0]?.velocity)
        this.particles.forEach(particle => {
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