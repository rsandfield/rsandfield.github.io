import { Vector2 } from "./vector2";
import { Particle } from "./particle";
import { Mouse } from "./mouse";

class Counts {
    mass: number = 0;
    count: number = 0;
    velocity: Vector2 = Vector2.ZERO;

    reset() {
        this.mass = 0;
        this.count = 0;
        this.velocity = Vector2.ZERO;
    }

    calculate() {
        this.velocity = this.velocity.scaled(1 / this.mass);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        ctx.fillStyle = 'white';
        ctx.fillText("Particles:", 10, 20)
        ctx.fillText(`${this.count}`, 85, 20)
        ctx.fillText(`Total Mass:`, 10, 35)
        ctx.fillText(`${this.mass.toFixed(2)}`, 85, 35)
        ctx.fillText(`Average Vector:`, 10, 50)
        ctx.fillText(`(${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)})`, 85, 50)

        ctx.restore()
    }
}

export class Display {
    canvas: HTMLCanvasElement;
    container: HTMLElement;
    ctx: CanvasRenderingContext2D;
    animationId: number = 0;

    mouse: Mouse = new Mouse();
    particles: Particle[] = [];
    previous: DOMHighResTimeStamp = 0;
    totals = new Counts();

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
                Math.random() * 10,
            ))
        }
    }

    mouseMove(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        switch(event.type) {
            case 'mousemove':
                this.mouse.mouseMove(event, rect);
                break;
            case 'mouseenter':
                this.mouse.active = true;
                break;
            case 'mouseleave':
                this.mouse.active = false;
                break;
            case 'mousedown':
                this.mouse.mouseDown(event, rect);
                break;
            case 'mouseup':
                this.particles.push(new Particle(
                    this.mouse.position,
                    this.mouse.mouseUp()
                ));
                break;
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

        // Iteractions for all particles
        this.particles.forEach(particle => {
            this.particles.forEach(other => {
                if (particle === other) {
                    return;
                }
                particle.interact(other, duration);
            });
        });
        this.particles = this.particles.filter(particle => !particle.expired)

        this.totals.reset();
        this.mouse.advance(duration);
        this.particles.forEach(particle => {
            particle.advance(duration, size);
            this.totals.count += 1;
            this.totals.mass += particle.mass;
            this.totals.velocity = this.totals.velocity.add(particle.velocity.scaled(particle.mass))
        });
        this.totals.calculate();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // console.log(this.particles[0]?.position, this.particles[0]?.velocity)
        this.particles.forEach(particle => {
            particle.draw(this.ctx);
        });
        this.mouse.draw(this.ctx);
        this.totals.draw(this.ctx);

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