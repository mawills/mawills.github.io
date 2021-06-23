interface MouseConfig {
  MOUSE_STARTING_X: number;
  MOUSE_STARTING_Y: number;
  MOUSE_WIDTH: number;
  MOUSE_HEIGHT: number;
}

export default class Configuration {
  CELL_SIZE: number;
  CELL_GAP: number;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
  TOWER_COST: number;
  ENEMY_SPAWN_INTERVAL: number;
  ENEMY_STARTING_POPULATION: number;
  STARTING_WAVE_SIZE: number;
  WAVE_GROWTH: number;
  PLAYER_STARTING_RESOURCES: number;
  MOUSE_CONFIG: MouseConfig;

  constructor() {
    this.CELL_SIZE = 50;
    this.CELL_GAP = 0;
    this.CANVAS_WIDTH = 900;
    this.CANVAS_HEIGHT = 600;
    this.TOWER_COST = 100;
    this.ENEMY_SPAWN_INTERVAL = 600;
    this.ENEMY_STARTING_POPULATION = 100;
    this.STARTING_WAVE_SIZE = 10;
    this.WAVE_GROWTH = 3;
    this.PLAYER_STARTING_RESOURCES = 300;
    this.MOUSE_CONFIG = {
      MOUSE_STARTING_X: 10,
      MOUSE_STARTING_Y: 10,
      MOUSE_WIDTH: 0.1,
      MOUSE_HEIGHT: 0.1,
    };
  }
}
