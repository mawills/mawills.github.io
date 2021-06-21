export default class Enemy {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  movement: number;
  health: number;
  maxHealth: number;
  lootValue: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.id = Math.random();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = Math.random() * 0.2 + 0.4;
    this.movement = this.speed;
    this.health = 100;
    this.maxHealth = this.health;
    this.lootValue = 20;
  }

  update() {
    this.x -= this.movement;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(String(Math.floor(this.health)), this.x + 15, this.y + 30);
  }
}
