import { Vector2 } from "./vector2";
import { Particle } from "./particle";
import { Mouse } from "./mouse";

class Counts {
    mass: number = 0;
    largest: number = 0;
    count: number = 0;
    velocity: Vector2 = Vector2.ZERO;
    _max_width: number = 0;

    reset() {
        this.mass = 0;
        this.largest = 0;
        this.count = 0;
        this.velocity = Vector2.ZERO;
    }

    calculate() {
        this.velocity = this.velocity.scaled(1 / this.mass);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save()

        ctx.translate(15, 23);

        function largest_text_width(array: string[]): number {
            const widest = array.reduce((acc, item) => {
                return ctx.measureText(acc).width > ctx.measureText(item).width ? acc : item;
            });
            return ctx.measureText(widest).width;
        }

        const items = [
            {
                label: 'Particles:',
                value: `${this.count}`
            },
            {
                label: 'Total Mass:',
                value: `${this.mass.toFixed(2)}`
            },
            {
                label: 'Largest Particle:',
                value: `${this.largest.toFixed(2)} (${(100 * this.largest / this.mass).toFixed(2)}%)`
            },
            {
                label: 'Average Vector:',
                value: `(${this.velocity.x.toFixed(2)}, ${this.velocity.y.toFixed(2)})`
            },
        ]

        const label_width = largest_text_width(items.map(item => item.label));
        this._max_width = Math.max(this._max_width, largest_text_width(items.map(item => item.value)));
        const row_height = 15;

        ctx.fillStyle = 'white';
        items.forEach((item, index: number) => {
            ctx.fillText(item.label, 0, index * row_height);
            ctx.fillText(item.value, label_width + 5, index * row_height);

        });

        const right = label_width + this._max_width + 10;
        const bottom = row_height * (items.length - 1) + 7
        ctx.strokeStyle = 'white';

        ctx.fillStyle = '#FFFFFF11'
        ctx.beginPath();
        ctx.rect(-7, -14, right + 7, bottom + 13);
        ctx.fill();

        // Upper left
        ctx.beginPath();
        ctx.moveTo(-8, 5);
        ctx.lineTo(-8, -15);
        ctx.lineTo(12, -15);
        ctx.arc(2, -5, 10, Math.PI * 1.5, Math.PI, true)
        
        // Lower left
        ctx.moveTo(-8, bottom - 20);
        ctx.lineTo(-8, bottom);
        ctx.lineTo(12, bottom);
        ctx.arc(2, bottom - 10, 10, Math.PI * 0.5, Math.PI)
        
        // Lower right
        ctx.moveTo(right, bottom - 20);
        ctx.lineTo(right, bottom);
        ctx.lineTo(right - 20, bottom);
        ctx.arc(right - 10, bottom - 10, 10, Math.PI * 0.5, 0, true)
        
        // Upper right
        ctx.moveTo(right, 5);
        ctx.lineTo(right, -15);
        ctx.lineTo(right - 20, -15);
        ctx.arc(right - 10, -5, 10, Math.PI * 1.5, 0)
        ctx.stroke();

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
        const duration = (timestamp - this.previous) * 0.001;
        if (duration > 1) {
            this.previous = timestamp;
            return;
        }

        this.previous = timestamp;
        const size = new Vector2(this.canvas.width, this.canvas.height);

        // Iteractions for all particles
        this.particles.forEach((particle, index) => {
            this.particles.slice(index + 1).forEach(other => {
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
            if (particle.mass > this.totals.largest) {
                this.totals.largest = particle.mass;
            }
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