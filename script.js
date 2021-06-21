class Configuration {
    constructor(cellSize, canvasWidth, canvasHeight) {
        this.CELL_SIZE = cellSize;
        this.CANVAS_WIDTH = canvasWidth;
        this.CANVAS_HEIGHT = canvasHeight;
        this.DEFENDER_COST = 100;
        this.ENEMY_SPAWN_INTERVAL = 600;
        this.PLAYER_STARTING_RESOURCES = 300;
        this.MOUSE_CONFIG = {
            MOUSE_STARTING_X: 10,
            MOUSE_STARTING_Y: 10,
            MOUSE_WIDTH: 0.1,
            MOUSE_HEIGHT:0.1,
        };
        
    }
};

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = this.cellSize;
        this.height = this.cellSize;
    };

    draw(ctx, mouse, collisionDetection) {
        if (mouse.x && mouse.y && collisionDetection(this, mouse)) {
            ctx.strokeStyle = 'black';
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
};

class Mouse {
    constructor(config) {
        this.x = config.MOUSE_STARTING_X;
        this.y = config.MOUSE_STARTING_Y;
        this.width = config.MOUSE_WIDTH;
        this.height = config.MOUSE_HEIGHT;
    }
};

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
    }

    update() {
        this.x += this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
    }
};

class Defender {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.shooting = false;
        this.health = 100;
        this.timer = 0;
    };

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '30px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }

    update(projectiles) {
        if (this.shooting) {
            this.timer += 1;
            if (this.timer % 100 === 0) {
                projectiles.push(new Projectile(this.x + 50, this.y + 50));
            }
        } else {
            this.timer = 0;
        };
        
    }
};

class Enemy {
    constructor(veritcalPosition, width, height) {
        this.id = Math.random();
        this.x = canvas.width;
        this.y = veritcalPosition;
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

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 30);
    }
};

class Game {
    constructor(config) {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = config.CANVAS_WIDTH;
        this.canvas.height = config.CANVAS_HEIGHT;
        this.ctx = canvas.getContext('2d');
        this.canvasPosition = canvas.getBoundingClientRect();
        this.cellSize = config.CELL_SIZE;
        this.defenders = new Map();
        this.enemies = new Map();
        this.projectiles = [];
        this.controlsBar = {
            width: this.canvas.width,
            height: this.cellSize
        };
        this.mouse = new Mouse(config.MOUSE_CONFIG);
        this.enemiesInterval = config.ENEMY_SPAWN_INTERVAL;
        this.numResources = config.PLAYER_STARTING_RESOURCES;
        this.defenderCost = config.DEFENDER_COST;
        this.numKills = 0;
        this.frame = 0;
        this.gameOver = false;
        
        this.gameGrid = [];
        for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
            for (let x = 0; x < this.canvas.width; x += this.cellSize) {
                this.gameGrid.push(new Cell(x, y));
            };
        };

        this.canvas.addEventListener('mousemove', e => {
            this.mouse.x = e.x - this.canvasPosition.left;
            this.mouse.y = e.y - this.canvasPosition.top;
        });
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });
        this.canvas.addEventListener('click', () => {
            const gridPositionX = this.mouse.x - (this.mouse.x % this.cellSize);
            const gridPositionY = this.mouse.y - (this.mouse.y % this.cellSize);
            const positionString = String(gridPositionX) + ',' + String(gridPositionY);
            if (gridPositionY < this.cellSize) return;
            if (this.defenders[positionString]) return;
            if (this.numResources >= this.defenderCost) {
                this.defenders.set(positionString, new Defender(gridPositionX, gridPositionY, this.cellSize, this.cellSize));
                this.numResources -= this.defenderCost;
            };
        });
    };

    start = () => {
        this.animate();
    };

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);
        this.handleGameGrid();
        this.handleDefenders();
        this.handleProjectiles();
        this.handleEnemies();
        this.handleGameStatus();
        this.frame += 1;
        if (!game.gameOver) requestAnimationFrame(this.animate);
    };

    collisionDetection = (first, second) => {
        if (first.x >= second.x + second.width ||
            second.x >= first.x + first.width ||
            first.y >= second.y + second.height ||
            second.y >= first.y + first.height) {
            return false;
        };
        return true;
    };

    handleGameGrid = () => {
        for (const cell of this.gameGrid) {
            cell.draw(this.ctx, this.mouse, this.collisionDetection);
        };
    };

    handleProjectiles = () => {
        let temp = [];
        for (const projectile of this.projectiles) {
            projectile.update();
            projectile.draw(this.ctx);

            let projectileDestroyed = false;
            for (const [e, enemy] of this.enemies) {
                if (this.collisionDetection(projectile, enemy)) {
                    enemy.health -= projectile.power;
                    projectileDestroyed = true;
                };
            };

            if (projectile.x > this.canvas.width - this.cellSize) {
                projectileDestroyed = true;
            };

            if (!projectileDestroyed) temp.push(projectile);
        };
        this.projectiles = temp;
    };

    handleDefenders = () => {
        for (const [d, defender] of this.defenders) {
            defender.update(this.projectiles);
            defender.draw(this.ctx);
            let enemyInRow = false;
            for (const [e, enemy] of this.enemies) {
                if (enemy.y == defender.y) enemyInRow = true;
    
                if (this.collisionDetection(defender, enemy)) {
                    enemy.movement = 0;
                    defender.health -= 0.2;
                };
    
                if (defender.health <= 0) {
                    this.defenders.delete(d);
                    enemy.movement = enemy.speed;
                };
            };
            defender.shooting = enemyInRow;
        };
    };

    handleEnemies = () => {
        for (const [e, enemy] of this.enemies) {
            enemy.update();
            enemy.draw(this.ctx);
            if (enemy.x < 0) this.gameOver = true;
            if (enemy.health <= 0) {
                this.enemies.delete(e);
                this.numResources += enemy.lootValue;
                this.numKills += 1;
            };
        };
    
        if (this.frame % this.enemiesInterval === 0) {
            const veritcalPosition = Math.floor(Math.random() * 5 + 1) * this.cellSize;
            const newEnemy = new Enemy(veritcalPosition, this.cellSize, this.cellSize);
            this.enemies.set(newEnemy.id, newEnemy);
            if (this.enemiesInterval > 120) this.enemiesInterval -= 50;
        };
    };

    handleGameStatus = () => {
        this.ctx.fillStyle = 'gold';
        this.ctx.font = '30px Arial';
        this.ctx.fillText('Kills: ' + this.numKills, 20, 40);
        this.ctx.fillText('Resources: ' + this.numResources, 20, 80);
        if (this.gameOver) {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '90px Arial';
            this.ctx.fillText('GAME OVER', 135, 330);
        };
    };
};

config = new Configuration(100, 900, 600);
game = new Game(config);
game.start();
