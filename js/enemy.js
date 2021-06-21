export default class Enemy {
    constructor(y, width, height) {
        this.id = Math.random();
        this.x = canvas.width;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.lootValue = 20;
    };

    update() {
        this.x -= this.movement;
    };

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    };
};
