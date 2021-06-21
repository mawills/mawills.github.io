export default class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
  }

  draw(ctx, mouse, collisionDetection) {
    if (mouse.x && mouse.y && collisionDetection(this, mouse)) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
