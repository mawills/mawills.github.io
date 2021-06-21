import Mouse from "./mouse";

export default class Cell {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    mouse: Mouse,
    collisionDetection: Function
  ) {
    if (mouse.x && mouse.y && collisionDetection(this, mouse)) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
