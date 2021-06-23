import Game from "./game";

export default class Projectile {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  power: number;
  speed: number;
  range: number;
  angle: number;

  constructor(
    game: Game,
    x: number,
    y: number,
    angle: number,
    speed: number,
    power: number,
    range: number
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.power = power;
    this.range = range;
    this.width = 10;
    this.height = 10;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
  }

  draw() {
    this.game.ctx.save();

    this.game.ctx.fillStyle = "black";
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    this.game.ctx.fill();

    this.game.ctx.restore();
  }
}
