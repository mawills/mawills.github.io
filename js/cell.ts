import Game from "./game";
import GameObject from "./gameObject";

export default class Cell extends GameObject {
  highlighted: boolean;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    super(game, x, y, width, height);
    this.highlighted = false;
  }

  update() {
    this.game.mouse.x &&
    this.game.mouse.y &&
    this.game.collisionDetection(this, this.game.mouse)
      ? (this.highlighted = true)
      : (this.highlighted = false);
  }

  draw() {
    this.game.ctx.save();

    if (this.highlighted) {
      this.game.ctx.strokeStyle = "black";
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    this.game.ctx.restore();
  }
}
