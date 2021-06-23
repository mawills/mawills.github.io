import Cell from "./cell";
import Mouse from "./mouse";
import Tower from "./tower";
import Enemy from "./enemy";
import Projectile from "./projectile";
import Configuration from "./configuration";
import FloatingText from "./floatingText";

interface ControlsBar {
  width: number;
  height: number;
}

export default class Game {
  config: Configuration;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cellSize: number;
  cellGap: number;
  grid: Cell[];
  towers: Map<string, Tower>;
  enemies: Map<number, Enemy>;
  projectiles: Projectile[];
  floatingTexts: FloatingText[];
  controlsBar: ControlsBar;
  mouse: Mouse;
  enemiesInterval: number;
  numResources: number;
  towerCost: number;
  waveSize: number;
  waveGrowthSize: number;
  waveCount: number;
  numKills: number;
  frame: number;
  gameOver: boolean;
  nextWaveButton: HTMLButtonElement;
  waveInProgress: boolean;

  constructor(config: Configuration) {
    this.config = config;

    // canvas
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.canvas.width = config.CANVAS_WIDTH;
    this.canvas.height = config.CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");

    // grid
    this.cellSize = config.CELL_SIZE;
    this.cellGap = config.CELL_GAP;
    this.grid = [];

    // game objects
    this.towers = new Map();
    this.enemies = new Map();
    this.projectiles = [];
    this.floatingTexts = [];

    // stats
    this.numResources = config.PLAYER_STARTING_RESOURCES;
    this.numKills = 0;
    this.waveCount = 0;

    this.controlsBar = {
      width: this.canvas.width,
      height: this.cellSize,
    };
    this.mouse = new Mouse(config);
    this.enemiesInterval = config.ENEMY_SPAWN_INTERVAL;
    this.towerCost = config.TOWER_COST;
    this.waveSize = config.STARTING_WAVE_SIZE;
    this.waveGrowthSize = config.WAVE_GROWTH;
    this.frame = 0;
    this.gameOver = false;
    this.nextWaveButton = <HTMLButtonElement>(
      document.getElementById("next-wave")
    );
    this.waveInProgress = false;

    this.populateGrid();
    this.handleMouseMovement();
    this.handleCanvasClicks();
    this.handleNextWaveButton();
  }

  start = () => {
    this.animate();
  };

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.handleGrid();
    this.handleTowers();
    this.handleProjectiles();
    this.handleEnemies();
    this.handleGameStatus();
    this.handleFloatingTexts();
    this.frame += 1;
    if (!this.gameOver) requestAnimationFrame(this.animate);
  };

  collisionDetection = (
    first: Tower | Enemy | Projectile | Mouse,
    second: Tower | Enemy | Projectile | Mouse
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

  handleMouseMovement = () => {
    const canvasPosition = this.canvas.getBoundingClientRect();
    this.canvas.addEventListener("mousemove", (e) => {
      this.mouse.x = e.x - canvasPosition.left;
      this.mouse.y = e.y - canvasPosition.top;
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    });
  };

  handleCanvasClicks = () => {
    this.canvas.addEventListener("click", () => {
      const gridPositionX = this.mouse.x - (this.mouse.x % this.cellSize);
      const gridPositionY = this.mouse.y - (this.mouse.y % this.cellSize);
      const positionString =
        String(gridPositionX) + "," + String(gridPositionY);
      if (gridPositionY < this.cellSize) return;
      if (this.towers.has(positionString)) return;
      if (this.numResources >= this.towerCost) {
        const newTowerWidth = this.cellSize - this.cellGap * 2;
        const newTowerHeight = newTowerWidth;
        this.towers.set(
          positionString,
          new Tower(
            this,
            gridPositionX,
            gridPositionY,
            newTowerWidth,
            newTowerHeight
          )
        );
        this.numResources -= this.towerCost;
      } else {
        this.floatingTexts.push(
          new FloatingText(
            this,
            "Insufficient Resources",
            this.mouse.x,
            this.mouse.y,
            15,
            "red"
          )
        );
      }
    });
  };

  handleNextWaveButton = () => {
    this.nextWaveButton.addEventListener("click", () => {
      this.waveInProgress = !this.waveInProgress;

      if (this.waveInProgress) {
        this.waveCount += 1;
        this.nextWaveButton.innerText = "stop wave";
      } else {
        this.nextWaveButton.innerText = "next wave";
      }

      this.nextWaveButton.classList.contains("button-red")
        ? this.nextWaveButton.classList.remove("button-red")
        : this.nextWaveButton.classList.add("button-red");
    });
  };

  populateGrid = () => {
    for (let y = this.cellSize; y < this.canvas.height; y += this.cellSize) {
      for (let x = 0; x < this.canvas.width; x += this.cellSize) {
        this.grid.push(new Cell(x, y, this.cellSize));
      }
    }
  };

  handleGrid = () => {
    for (const cell of this.grid) {
      cell.draw(this.ctx, this.mouse, this.collisionDetection);
    }
  };

  handleProjectiles = () => {
    let temp = [];
    for (const projectile of this.projectiles) {
      projectile.update();
      projectile.draw();

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

  handleTowers = () => {
    this.towers.forEach((tower) => {
      tower.update();
      tower.draw();
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
        this.floatingTexts.push(
          new FloatingText(
            this,
            "+" + enemy.lootValue,
            enemy.x,
            enemy.y,
            15,
            "black"
          )
        );
        this.numResources += enemy.lootValue;
        this.numKills += 1;
      }
    });

    if (this.waveInProgress && this.frame % this.enemiesInterval === 0) {
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

  handleFloatingTexts = () => {
    let temp: FloatingText[] = [];
    this.floatingTexts.forEach((floatingText) => {
      floatingText.update();
      floatingText.draw();
      if (floatingText.lifespan < this.config.FLOATING_TEXT_LIFESPAN) {
        temp.push(floatingText);
      }
    });
    this.floatingTexts = temp;
  };
}
