import Projectile from "./projectile";

export default class Defender {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.shooting = false;
    this.health = 100;
    this.timer = 0;
    this.range = 200;
  }

  draw(ctx, mouse, collisionDetection) {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gold";
    ctx.font = "30px Arial";
    ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    if (mouse.x && mouse.y && collisionDetection(this, mouse)) {
      ctx.beginPath();
      const centerX = this.x + this.width / 2;
      const centerY = this.y + this.height / 2;
      ctx.arc(centerX, centerY, this.range, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
      ctx.fill();
    }
  }

  update(projectiles) {
    if (this.shooting) {
      this.timer += 1;
      if (this.timer % 100 === 0) {
        projectiles.push(
          new Projectile(this.x + this.width / 2, this.y + this.height / 2)
        );
      }
    } else {
      this.timer = 0;
    }
  }
}
