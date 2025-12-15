import { HSVtoRGB, parseColor, RGBtoCSS, RGBtoHSV, type Color, type RGB } from "vuetify/lib/util/colorUtils.mjs";
import { Vector2 } from "./vector2";

const G = 6.6743 * 10 ** 1.5; // Actually 10^-11 but that's too small to see here
const C = 10 ** 5;

export class Particle {
    position: Vector2;
    velocity: Vector2;
    velocity_new: Vector2 = Vector2.ZERO;
    positions_old: Vector2[] = []
    radius: number = 2;
    mass: number = 1;
    color: RGB;
    age: number = 0;
    expired: boolean = false;

    constructor(position: Vector2, velocity: Vector2, mass: number = 5, color: Color | null = null) {
        this.position = position;
        this.velocity = velocity;
        this.velocity_new = velocity;
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

    private _merge(other: Particle) {
        const mass_total = this.mass + other.mass;
        this.velocity_new = this.velocity.scaled(this.mass / mass_total);
        // this.position = this.position.subtract(relative_position.scaled(1 - (this.mass / mass_total)));
        this.setMass(mass_total);
        this.color = {
            r: (this.color.r * this.mass + other.color.r * other.mass) / mass_total,
            g: (this.color.g * this.mass + other.color.g * other.mass) / mass_total,
            b: (this.color.b * this.mass + other.color.b * other.mass) / mass_total,
        }
        other.expired = true;
    }

    private _bounce(other: Particle) {
        const relative_position = this.position.subtract(other.position);
        const minimum_distance = this.radius + other.radius;
        const mass_total = this.mass + other.mass;

        const phi = Math.atan(
            ((this.radius ** 2 + other.radius ** 2 - minimum_distance ** 2) /
            (2 * this.radius * other.radius)) % 1
        ) // Contact angle

        const phi_i = phi + Math.PI // Inverse of contact angle
        const a1 = this.velocity.angle()
        const a1_r = a1 - phi // Relative angle to impact
        const s1 = this.velocity.magnitude()
        const a2 = other.velocity.angle()
        const a2_r = a2 - phi // Relative angle to impact
        const s2 = other.velocity.magnitude()
        const contact_h = s1 * Math.sin(a1_r)

        const base = (s1 * Math.cos(a1_r) * (this.mass - other.mass) + 2 * other.mass * s2 * Math.cos(a2_r)) / mass_total

        this.velocity_new = new Vector2(
            base * Math.cos(phi) + contact_h * Math.cos(phi_i),
            base * Math.sin(phi) + contact_h * Math.sin(phi_i)
        );
        this.position = this.position.add(
            relative_position
                .normalized()
                .scaled((minimum_distance - relative_position.magnitude()) * other.radius / this.radius)
        );
    }

    private _attract(other: Particle, duration: number) {
        const relative_position = this.position.subtract(other.position);
        const mass_total = this.mass + other.mass;

        const attraction = relative_position.normalized()
            .scaled((mass_total) / this.mass)
            .scaled(1 / relative_position.magnitude_squared())
            .scaled(G)
            .scaled(duration);
        
        this.velocity_new = this.velocity.subtract(attraction);
    }
    
    interact(other: Particle, duration: number) {
        if (this.expired) {
            return;
        }
        const relative_position = this.position.subtract(other.position);
        const relative_velocity = this.velocity.subtract(other.velocity);
        const mass_total = this.mass + other.mass;
        const minimum_distance = this.radius + other.radius;

        if (relative_position.magnitude_squared() === 0) {
            return;
        } else if (relative_position.magnitude() < minimum_distance) {
            if (
                !other.expired &&
                this.mass >= other.mass &&
                relative_velocity.magnitude_squared() < mass_total * G
            ) {
                this._merge(other);
                return;
            } else {
                this._bounce(other);
                return;
            }
        } else {
			this._attract(other, duration)
		}

        const color = RGBtoHSV(this.color);
        if (color.s < 1) {
            color.s = Math.min(color.s + 0.1, 1)
            this.color = HSVtoRGB(color);
        }
    }

    advance(duration: number, bounds: Vector2) {
        if (this.velocity.magnitude_squared() > C) {
            this.velocity_new = this.velocity_new.scaled(0.99);
        }

        this.velocity = this.velocity_new;
        this.age += duration;

        this.position = this.position.add(this.velocity.scaled(duration));
        if (this.position.x < this.radius) {
            this.position.x = (this.position.x + this.radius) % bounds.x
            this.velocity.x = Math.abs(this.velocity.x)
        } else if (this.position.x > bounds.x - this.radius) {
            this.position.x = ((bounds.x - this.radius) * 2 - this.position.x) % bounds.x
            this.velocity.x = -Math.abs(this.velocity.x)
        }
        if (this.position.y < this.radius) {
            this.position.y = (this.position.y + this.radius) % bounds.y
            this.velocity.y = Math.abs(this.velocity.y)
        } else if (this.position.y > bounds.y - this.radius) {
            this.position.y = ((bounds.y - this.radius) * 2 - this.position.y) % bounds.y
            this.velocity.y = -Math.abs(this.velocity.y)
        }

        this.positions_old.push(this.position)
        if (this.positions_old.length > 6) {
            this.positions_old.shift();
        }
    }
    
        draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.lineCap = 'round';

        const alpha_step = 1.0 / this.positions_old.length
        const faded = {
            r: this.color.r,
            g: this.color.g,
            b: this.color.b,
            a: alpha_step,
        };
        let previous = this.position;
        this.positions_old.forEach((position, index) => {
            faded.a += alpha_step;
            ctx.strokeStyle = RGBtoCSS(faded);
            ctx.lineWidth = this.radius * (index / this.positions_old.length) * 2;
            ctx.beginPath();
            ctx.moveTo(previous.x, previous.y);
            ctx.lineTo(position.x, position.y);
            ctx.stroke();
            ctx.closePath();

            previous = position;
        });

        ctx.lineWidth = 0;
        ctx.fillStyle = RGBtoCSS(this.color);
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = this.radius + Math.log(this.radius);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
    }
}