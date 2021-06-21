import Cell from "./cell";
import Mouse from "./mouse";
import Defender from "./defender";
import Enemy from "./enemy";
import Projectile from "./projectile";
import Configuration from "./configuration";

interface ControlsBar {
  width: number;
  height: number;
}

export default class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasPosition: ClientRect;
  cellSize: number;
  cellGap: number;
  defenders: Map<string, Defender>;
  enemies: Map<number, Enemy>;
  projectiles: Projectile[];
  controlsBar: ControlsBar;
  mouse: Mouse;
  enemiesInterval: number;
  numResources: number;
  defenderCost: number;
  waveSize: number;
  waveGrowthSize: number;
  waveCount: number;
  numKills: number;
  frame: number;
  gameOver: boolean;
  gameGrid: Cell[];

  constructor(config: Configuration) {
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.canvas.width = config.CANVAS_WIDTH;
    this.canvas.height = config.CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");
    this.canvasPosition = this.canvas.getBoundingClientRect();
    this.cellSize = config.CELL_SIZE;
    this.cellGap = config.CELL_GAP;
    this.defenders = new Map();
    this.enemies = new Map();
    this.projectiles = [];
    this.controlsBar = {
      width: this.canvas.width,
      height: this.cellSize,
    };
    this.mouse = new Mouse(config);
    this.enemiesInterval = config.ENEMY_SPAWN_INTERVAL;
    this.numResources = config.PLAYER_STARTING_RESOURCES;
    this.defenderCost = config.DEFENDER_COST;
    this.waveSize = config.STARTING_WAVE_SIZE;
    this.waveGrowthSize = config.WAVE_GROWTH;
    this.waveCount = 1;
    this.numKills = 0;
    this.frame = 0;
    this.gameOver = false;

    this.gameGrid = [];
    for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.canvas.width; x += this.cellSize) {
        this.gameGrid.push(new Cell(x, y, this.cellSize));
      }
    }

    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x - this.canvasPosition.left;
      this.mouse.y = e.y - this.canvasPosition.top;
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
    this.canvas.addEventListener("click", () => {
      const gridPositionX = this.mouse.x - (this.mouse.x % this.cellSize);
      const gridPositionY = this.mouse.y - (this.mouse.y % this.cellSize);
      const positionString =
        String(gridPositionX) + "," + String(gridPositionY);
      if (gridPositionY < this.cellSize) return;
      if (this.defenders.has(positionString)) return;
      if (this.numResources >= this.defenderCost) {
        const newDefenderWidth = this.cellSize - this.cellGap * 2;
        const newDefederHeight = newDefenderWidth;
        this.defenders.set(
          positionString,
          new Defender(
            gridPositionX,
            gridPositionY,
            newDefenderWidth,
            newDefederHeight
          )
        );
        this.numResources -= this.defenderCost;
      }
    });
  }

  start = () => {
    this.animate();
  };

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.handleGameGrid();
    this.handleDefenders();
    this.handleProjectiles();
    this.handleEnemies();
    this.handleGameStatus();
    this.frame += 1;
    if (!this.gameOver) requestAnimationFrame(this.animate);
  };

  collisionDetection = (
    first: Defender | Enemy | Projectile,
    second: Defender | Enemy | Projectile
  ) => {
    if (
      first.x >= second.x + second.width ||
      second.x >= first.x + first.width ||
      first.y >= second.y + second.height ||
      second.y >= first.y + first.height
    ) {
      return false;
    }
    return true;
  };

  calculateDistance = (
    first: Defender | Enemy | Projectile,
    second: Defender | Enemy | Projectile
  ) => {
    const deltaX = Math.abs(first.x - second.x);
    const deltaY = Math.abs(first.y - second.y);
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };

  handleGameGrid = () => {
    for (const cell of this.gameGrid) {
      cell.draw(this.ctx, this.mouse, this.collisionDetection);
    }
  };

  handleProjectiles = () => {
    let temp = [];
    for (const projectile of this.projectiles) {
      projectile.update();
      projectile.draw(this.ctx);

      let projectileDestroyed = false;
      this.enemies.forEach((enemy) => {
        if (this.collisionDetection(projectile, enemy)) {
          enemy.health -= projectile.power;
          projectileDestroyed = true;
        }
      });

      if (projectile.x > this.canvas.width - this.cellSize) {
        projectileDestroyed = true;
      }

      if (!projectileDestroyed) temp.push(projectile);
    }
    this.projectiles = temp;
  };

  handleDefenders = () => {
    this.defenders.forEach((defender) => {
      defender.update(this.projectiles);
      defender.draw(this.ctx, this.mouse, this.collisionDetection);
      let enemyInRange = false;
      this.enemies.forEach((enemy) => {
        const distanceToEnemy = this.calculateDistance(defender, enemy);
        if (distanceToEnemy <= defender.range) enemyInRange = true;
      });
      defender.shooting = enemyInRange;
    });
  };

  handleEnemies = () => {
    this.enemies.forEach((enemy, key) => {
      enemy.update();
      enemy.draw(this.ctx);
      if (enemy.x + enemy.width < 0) {
        this.enemies.delete(key);
      }
      if (enemy.health <= 0) {
        this.enemies.delete(key);
        this.numResources += enemy.lootValue;
        this.numKills += 1;
      }
    });

    if (this.frame % this.enemiesInterval === 0) {
      const newEnemyWidth = this.cellSize - this.cellGap * 2;
      const newEnemyHeight = newEnemyWidth;
      const veritcalPosition = Math.floor(
        Math.random() *
          (this.canvas.height - this.controlsBar.height / this.cellSize) -
          newEnemyHeight
      );
      const newEnemy = new Enemy(
        this.canvas.width,
        veritcalPosition,
        newEnemyWidth,
        newEnemyHeight
      );
      this.enemies.set(newEnemy.id, newEnemy);
      if (this.enemiesInterval > 120) this.enemiesInterval -= 50;
    }
  };

  handleGameStatus = () => {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);
    this.ctx.fillStyle = "gold";
    this.ctx.font = "30px Arial";
    this.ctx.fillText("Resources: " + this.numResources, 20, 35);
    this.ctx.fillText("Kills: " + this.numKills, 270, 35);
    this.ctx.fillText("Wave: " + this.waveCount, this.canvas.width - 150, 35);
    if (this.gameOver) {
      this.ctx.fillStyle = "black";
      this.ctx.font = "90px Arial";
      this.ctx.fillText("GAME OVER", 135, 330);
    }
  };
}
