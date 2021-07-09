import config from "./configuration";
import Projectile from "./projectile";
import Alien from "./alien";
import Game from "./game";
import GameObject from "./gameObject";
import { calculateDistance, collisionDetection } from "./util";

export default class Tower extends GameObject {
  level: number;
  cost: number;

  constructor(game: Game, x: number, y: number, cost: number) {
    super(
      game,
      x,
      y,
      config.CELL_SIZE - config.CELL_GAP * 2,
      config.CELL_SIZE - config.CELL_GAP * 2
    );

    this.level = 1;
    this.cost = cost;
  }
}

export class MachineGunTower extends Tower {
  range: number;
  cooldown: number;
  projectileSpeed: number;
  power: number;
  lastFired: number;
  angle: number;
  target: Alien | null;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y, config.MACHINE_GUN_TOWER_STATS.cost);

    this.range = config.MACHINE_GUN_TOWER_STATS.range;
    this.cooldown = config.MACHINE_GUN_TOWER_STATS.cooldown;
    this.projectileSpeed = config.MACHINE_GUN_TOWER_STATS.projectileSpeed;
    this.power = config.MACHINE_GUN_TOWER_STATS.power;
    this.angle = 0;
    this.target = null;
    this.lastFired = Date.now();
  }

  findTarget() {
    if (this.target && !this.game.aliens.has(this.target.id))
      this.target = null;
    if (!this.target) {
      for (const alien of this.game.aliens.values()) {
        if (calculateDistance(this, alien) < this.range) {
          this.target = alien;
          return;
        }
      }
    }
  }

  changeAngle() {
    if (this.target) {
      let dx = this.x - this.target.x;
      let dy = this.y - this.target.y;
      this.angle = Math.atan2(dy, dx) - Math.PI;
    }
  }

  checkFire() {
    if (this.target) {
      const now = Date.now();
      const distanceToTarget = calculateDistance(this, this.target);
      if (this.range > distanceToTarget) {
        if (now - this.lastFired > this.cooldown) {
          this.game.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              6,
              6,
              this.angle,
              this.projectileSpeed,
              this.power,
              this.game.canvas.width
            )
          );
          this.lastFired = now;
        }
      } else {
        this.target = null;
      }
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
    this.game.ctx.fillStyle = "black";
    this.game.ctx.font = "30px Arial";
    this.game.ctx.fillText("===", this.x + 15, this.y + 30);
    if (
      this.game.mouse.x &&
      this.game.mouse.y &&
      collisionDetection(this, this.game.mouse)
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
    this.findTarget();
    this.changeAngle();
    this.checkFire();
  }
}

export class FlamethrowerTower extends Tower {
  range: number;
  cooldown: number;
  projectileSpeed: number;
  power: number;
  lastFired: number;
  angle: number;
  target: Alien | null;

  constructor(game: Game, x: number, y: number) {
    super(game, x, y, config.FLAMETHROWER_TOWER_STATS.cost);

    this.range = config.FLAMETHROWER_TOWER_STATS.range;
    this.cooldown = config.FLAMETHROWER_TOWER_STATS.cooldown;
    this.projectileSpeed = config.FLAMETHROWER_TOWER_STATS.projectileSpeed;
    this.power = config.FLAMETHROWER_TOWER_STATS.power;
    this.angle = 0;
    this.target = null;
    this.lastFired = Date.now();
  }

  findTarget() {
    if (this.target && !this.game.aliens.has(this.target.id))
      this.target = null;
    if (!this.target) {
      for (const alien of this.game.aliens.values()) {
        if (calculateDistance(this, alien) < this.range) {
          this.target = alien;
          return;
        }
      }
    }
  }

  changeAngle() {
    if (this.target) {
      let dx = this.x - this.target.x;
      let dy = this.y - this.target.y;
      this.angle = Math.atan2(dy, dx) - Math.PI;
    }
  }

  checkFire() {
    if (this.target) {
      const now = Date.now();
      const distanceToTarget = calculateDistance(this, this.target);
      if (this.range > distanceToTarget) {
        if (now - this.lastFired > this.cooldown) {
          this.game.projectiles.push(
            new Projectile(
              this.game,
              this.x + this.width / 2,
              this.y + this.height / 2,
              6,
              6,
              this.angle,
              this.projectileSpeed,
              this.power,
              this.range
            )
          );
          this.lastFired = now;
        }
      } else {
        this.target = null;
      }
    }
  }

  draw() {
    this.game.ctx.save();

    this.game.ctx.fillStyle = "orange";
    this.game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    this.game.ctx.rotate(this.angle);
    this.game.ctx.translate(
      -(this.x + this.width / 2),
      -(this.y + this.height / 2)
    );
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.fillStyle = "black";
    this.game.ctx.font = "30px Arial";
    this.game.ctx.fillText("===", this.x + 15, this.y + 30);
    if (
      this.game.mouse.x &&
      this.game.mouse.y &&
      collisionDetection(this, this.game.mouse)
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
    this.findTarget();
    this.changeAngle();
    this.checkFire();
  }
}
