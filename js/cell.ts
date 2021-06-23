import Game from "./game";

export default class Cell {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(game: Game, x: number, y: number, size: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = size;
    this.height = size;
  }

  draw() {
    this.game.ctx.save();

    if (
      this.game.mouse.x &&
      this.game.mouse.y &&
      this.game.collisionDetection(this, this.game.mouse)
    ) {
      this.game.ctx.strokeStyle = "black";
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    this.game.ctx.restore();
  }
}
