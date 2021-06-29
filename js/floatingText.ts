import config from "./configuration";
import Game from "./game";

export default class FloatingText {
  game: Game;
  text: string;
  x: number;
  y: number;
  size: number;
  color: string;
  age: number;
  opacity: number;

  constructor(
    game: Game,
    text: string,
    x: number,
    y: number,
    size: number,
    color: string
  ) {
    this.game = game;
    this.text = text;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.age = 0;
    this.opacity = 1;
  }

  expired() {
    return this.age >= config.FLOATING_TEXT_LIFESPAN;
  }

  update() {
    this.y -= 0.3;
    this.age += 1;
    if (this.opacity > 0.05) this.opacity -= 0.02;
  }

  draw() {
    this.game.ctx.save();

    this.game.ctx.globalAlpha = this.opacity;
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.font = this.size + "px Arial";
    this.game.ctx.fillText(this.text, this.x, this.y);
    this.game.ctx.globalAlpha = 1;

    this.game.ctx.restore();
  }
}
