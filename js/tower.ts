import Projectile from "./projectile";
import Mouse from "./mouse";
import Enemy from "./enemy";
import Game from "./game";

export default class Tower {
  game: Game;
  x: number;
  y: number;
  width: number;
  height: number;
  health: number;
  range: number;
  cooldown: number;
  lastFired: number;
  angle: number;
  target: Enemy | null;

  constructor(game: Game, x: number, y: number, width: number, height: number) {
    this.game = game;

    // location
    this.x = x;
    this.y = y;

    // appearance
    this.width = width;
    this.height = height;

    // stats
    this.health = 100;
    this.range = 200;
    this.cooldown = 500;

    // attack
    this.angle = 0;
    this.target = null;
    this.lastFired = Date.now();
  }

  calculateDistance(
    first: Tower | Enemy | Projectile,
    second: Tower | Enemy | Projectile
  ) {
    const deltaX = Math.abs(first.x - second.x);
    const deltaY = Math.abs(first.y - second.y);
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  }

  findTarget() {
    this.game.enemies.forEach((enemy) => {
      if (this.calculateDistance(this, enemy) < this.range) {
        this.target = enemy;
        return;
      }
    });
  }

  changeAngle() {
    if (this.target) {
      let dx = this.x - this.target.x;
      let dy = this.y - this.target.y;
      this.angle = Math.atan2(dy, dx) - Math.PI;
    }
  }

  checkFire() {
    const now = Date.now();
    const distanceToTarget = this.calculateDistance(this, this.target);
    if (this.range > distanceToTarget && now - this.lastFired > this.cooldown) {
      this.game.projectiles.push(
        new Projectile(this.x + this.width / 2, this.y + this.height / 2)
      );
      this.lastFired = now;
    } else {
      this.target = null;
    }
  }

  draw() {
    this.game.ctx.save();

    this.game.ctx.fillStyle = "blue";
    this.game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.game.ctx.rotate(this.angle);
    this.game.ctx.translate(
      -(this.x + this.width / 2),
      -(this.y + this.height / 2)
    );
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillStyle = "gold";
    this.game.ctx.font = "30px Arial";
    this.game.ctx.fillText(
      String(Math.floor(this.health)),
      this.x + 15,
      this.y + 30
    );
    if (
      this.game.mouse.x &&
      this.game.mouse.y &&
      this.game.collisionDetection(this, this.game.mouse)
    ) {
      this.game.ctx.beginPath();
      const centerX = this.x + this.width / 2;
      const centerY = this.y + this.height / 2;
      this.game.ctx.arc(centerX, centerY, this.range, 0, Math.PI * 2);
      this.game.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      this.game.ctx.fill();
    }

    this.game.ctx.restore();
  }

  update() {
    if (!this.target) {
      this.findTarget();
    } else {
      this.changeAngle();
      this.checkFire();
    }
  }
}
