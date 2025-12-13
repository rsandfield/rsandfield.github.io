export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  static readonly ZERO = new Vector2(0, 0);
  static readonly ONE = new Vector2(1, 1);
  static readonly UP = new Vector2(0, 1);
  static readonly DOWN = new Vector2(0, -1);
  static readonly LEFT = new Vector2(-1, 0);
  static readonly RIGHT = new Vector2(1, 0);

  static random(bounds?: Vector2): Vector2 {
    if (bounds) {
      return new Vector2(
        Math.random() * bounds.x,
        Math.random() * bounds.y,
      )
    }
    return new Vector2(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
    );
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  scaled(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  magnitude_squared(): number {
    return this.x ** 2 + this.y ** 2;
  }

  magnitude(): number {
    return Math.sqrt(this.magnitude_squared());
  }

  normalized(): Vector2 {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector2(0, 0);
    }
    return this.scaled(1 / mag);
  }

  dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }

  angle(): number {
    return Math.atan2(this.y, this.x) - Math.PI * 0.5;
  }

  toString() {
    return `Vector2 (${this.x}, ${this.y})`;
  }
}
