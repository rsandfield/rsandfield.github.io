export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Vector2): Vector2 {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  subtract(other: Vector2): Vector2 {
    return new Vector2(this.x - other.x, this.y - other.y);
  }

  scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar)
  }

  magnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  normalized(): Vector2 {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector2(0, 0);
    }
    return this.scale(1 / mag);
  }

  dot(other: Vector2): number {
    return this.x * other.x + this.y * other.y;
  }

  toString() {
    return `Vector2 (${this.x}, ${this.y})`
  }
}
