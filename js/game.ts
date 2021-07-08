import Cell from "./cell";
import Mouse from "./mouse";
import Tower, { FlamethrowerTower, MachineGunTower } from "./tower";
import Alien from "./alien";
import Projectile from "./projectile";
import config from "./configuration";
import FloatingText from "./floatingText";
import Population from "./population";
import Dom from "./dom";
import GameObject from "./gameObject";

export default class Game {
  nextWaveButton: HTMLButtonElement;
  stats: HTMLDivElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  grid: Cell[];
  towers: Map<string, Tower>;
  aliens: Map<number, Alien>;
  projectiles: Projectile[];
  floatingTexts: FloatingText[];
  mouse: Mouse;
  alienSpawnInterval: number;
  numResources: number;
  waveSize: number;
  waveCount: number;
  numKills: number;
  gameOver: boolean;
  waveInProgress: boolean;
  population: Population;
  attackWave: Alien[];
  gameStarted: boolean;
  lastSpawnedTime: number;
  towerStats: HTMLDivElement;
  towerSelector: HTMLDivElement;
  selectedTowerCard: string;

  constructor(dom: Dom) {
    // dom
    this.nextWaveButton = dom.nextWaveButton;
    this.stats = dom.stats;
    this.towerStats = dom.towerStats;
    this.towerSelector = dom.towerSelector;

    // canvas
    this.canvas = dom.canvas;
    this.canvas.width = config.CANVAS_WIDTH;
    this.canvas.height = config.CANVAS_HEIGHT;
    let ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");
    this.ctx = ctx;

    // grid
    this.grid = [];

    // game objects
    this.towers = new Map();
    this.aliens = new Map();
    this.projectiles = [];
    this.floatingTexts = [];

    // alien population
    this.population = new Population(this, config.ENEMY_STARTING_POPULATION);
    this.attackWave = [];

    // stats
    this.numResources = config.PLAYER_STARTING_RESOURCES;
    this.numKills = 0;
    this.waveCount = 0;

    // wave control
    this.waveInProgress = false;
    this.alienSpawnInterval = config.INITIAL_SPAWN_INTERVAL;
    this.waveSize = config.STARTING_WAVE_SIZE;
    this.lastSpawnedTime = 0;

    // controls bar
    this.selectedTowerCard = "";

    // mouse
    this.mouse = new Mouse();

    // game status
    this.gameStarted = false;
    this.gameOver = false;

    this.initializeGrid();
    this.initializeControlsBar();
    this.handleMouse();
    this.handleCanvasClicks();
    this.handleNextWaveButton();
  }

  start() {
    this.animate();
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.handleGrid();
    this.handleTowers();
    this.handleProjectiles();
    this.handleAliens();
    this.handleFloatingTexts();
    this.handleAttackWave();
    this.handleGameStatsBar();
    if (!this.gameOver) requestAnimationFrame(this.animate);
  };

  collisionDetection(first: GameObject | Mouse, second: GameObject | Mouse) {
    if (
      first.x >= second.x + second.width ||
      second.x >= first.x + first.width ||
      first.y >= second.y + second.height ||
      second.y >= first.y + first.height
    ) {
      return false;
    }
    return true;
  }

  calculateDistance(first: GameObject, second: GameObject) {
    const deltaX = Math.abs(first.x - second.x);
    const deltaY = Math.abs(first.y - second.y);
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  }

  handleMouse() {
    this.canvas.addEventListener("mousemove", (e) => {
      const canvasPosition = this.canvas.getBoundingClientRect();
      this.mouse.update(e.x - canvasPosition.left, e.y - canvasPosition.top);
    });
    this.canvas.addEventListener("mouseleave", () => {
      this.mouse.update(0, 0);
    });
  }

  initializeControlsBar() {
    let temp: any = Array.from(this.towerSelector.children);
    temp.forEach((child: any) => {
      child.onclick = () => {
        this.selectedTowerCard = child.id;
        this.towerStats.innerText = `selected ${this.selectedTowerCard}`;
      };
    });
  }

  purchaseTower(towerId: string, gridCellX: number, gridCellY: number) {
    let newTower: Tower;
    switch (this.selectedTowerCard) {
      case "tower1":
        newTower = new MachineGunTower(
          this,
          gridCellX,
          gridCellY,
          config.MACHINE_GUN_TOWER_STATS.cost,
          config.MACHINE_GUN_TOWER_STATS.range,
          config.MACHINE_GUN_TOWER_STATS.cooldown,
          config.MACHINE_GUN_TOWER_STATS.projectileSpeed,
          config.MACHINE_GUN_TOWER_STATS.power
        );
        break;
      case "tower2":
        newTower = new FlamethrowerTower(
          this,
          gridCellX,
          gridCellY,
          config.FLAMETHROWER_TOWER_STATS.cost,
          config.FLAMETHROWER_TOWER_STATS.range,
          config.FLAMETHROWER_TOWER_STATS.cooldown,
          config.FLAMETHROWER_TOWER_STATS.projectileSpeed,
          config.FLAMETHROWER_TOWER_STATS.power
        );
        break;
      default:
        return;
    }

    if (newTower.cost >= this.numResources) {
      this.createFloatingText(
        "Insufficient Resources",
        this.mouse.x,
        this.mouse.y
      );
    } else {
      this.numResources -= newTower.cost;
      this.selectedTowerCard = "";
      this.towerStats.innerText = "";
      this.towers.set(towerId, newTower);
    }
  }

  handleCanvasClicks() {
    this.canvas.addEventListener("click", () => {
      const gridCellX = this.mouse.x - (this.mouse.x % config.CELL_SIZE);
      const gridCellY = this.mouse.y - (this.mouse.y % config.CELL_SIZE);
      const towerId = gridCellX + "," + gridCellY;

      if (this.towers.has(towerId)) {
        const tower = this.towers.get(towerId);
        this.towerStats.innerHTML = `<ul>
          <li>Power: ${tower?.power}</li>
          <li>Cooldown: ${tower?.cooldown}</li>
        </ul>
        <button>Upgrade</button>`;
      }

      if (this.selectedTowerCard.length > 0 && !this.towers.has(towerId)) {
        this.purchaseTower(towerId, gridCellX, gridCellY);
      }
    });
  }

  handleNextWaveButton() {
    this.nextWaveButton.addEventListener("click", () => {
      if (!this.gameStarted) this.gameStarted = true;

      this.nextWaveButton.disabled = true;
      this.nextWaveButton.innerText = "wave in progress";

      this.waveCount += 1;
      if (this.waveCount > 1) this.population.reproduce();

      this.waveSize = Math.floor(this.population.population.length / 2);
      if (this.waveSize <= config.MIN_WAVE_SIZE)
        this.waveSize = Math.min(
          config.MIN_WAVE_SIZE,
          this.population.population.length
        );

      this.waveInProgress = true;
      this.attackWave = this.population.createAttackWave(this.waveSize);
    });
  }

  initializeGrid() {
    for (let y = 0; y < this.canvas.height; y += config.CELL_SIZE) {
      for (let x = 0; x < this.canvas.width; x += config.CELL_SIZE) {
        this.grid.push(
          new Cell(this, x, y, config.CELL_SIZE, config.CELL_SIZE)
        );
      }
    }
  }

  handleGameStatsBar() {
    this.stats.innerText =
      "Resources: " +
      this.numResources +
      " " +
      "Kills: " +
      this.numKills +
      " " +
      "Wave: " +
      this.waveCount +
      " " +
      "Population: " +
      (this.population.population.length +
        this.aliens.size +
        this.attackWave.length);
  }

  handleGrid() {
    for (const cell of this.grid) {
      cell.update();
      cell.draw();
    }
  }

  handleProjectiles() {
    let temp: Projectile[] = [];
    this.projectiles.forEach((projectile) => {
      projectile.update();
      projectile.draw();
      if (!projectile.destroyed) temp.push(projectile);
    });
    this.projectiles = temp;
  }

  handleTowers() {
    this.towers.forEach((tower) => {
      tower.update();
      tower.draw();
    });
  }

  handleAliens() {
    this.aliens.forEach((alien, key) => {
      alien.update();
      alien.draw();

      if (alien.x + alien.width < 0) {
        alien.x = this.canvas.width;
        this.population.population.push(alien);
        this.aliens.delete(key);
      }

      if (!alien.alive()) {
        this.aliens.delete(key);
        this.createFloatingText("+" + alien.lootValue, alien.x, alien.y);
        this.numResources += alien.lootValue;
        this.numKills += 1;
      }
    });

    if (
      this.waveInProgress &&
      Date.now() - this.lastSpawnedTime > this.alienSpawnInterval
    ) {
      let temp = this.attackWave.pop();
      if (temp) {
        this.aliens.set(temp.id, temp);
        this.lastSpawnedTime = Date.now();
        if (this.alienSpawnInterval > config.MIN_SPAWN_INTERVAL)
          this.alienSpawnInterval -= config.SPAWN_INTERVAL_DECREMENT;
      }
    }
  }

  handleAttackWave() {
    if (this.gameStarted && !this.waveInProgress) {
      this.nextWaveButton.disabled = false;
      this.nextWaveButton.innerText = "next wave";
    }

    if (this.attackWave.length == 0 && this.aliens.size == 0) {
      this.waveInProgress = false;
    }
  }

  handleFloatingTexts() {
    let temp: FloatingText[] = [];
    this.floatingTexts.forEach((floatingText) => {
      floatingText.update();
      floatingText.draw();
      if (!floatingText.expired()) {
        temp.push(floatingText);
      }
    });
    this.floatingTexts = temp;
  }

  createFloatingText(text: string, x: number, y: number) {
    this.floatingTexts.push(new FloatingText(this, text, x, y, 15, "black"));
  }
}
