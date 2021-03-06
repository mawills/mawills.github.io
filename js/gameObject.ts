import Game from "./game";

export default class GameObject {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update() {}

  draw() {}
}
