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
  INITIAL_SPAWN_INTERVAL: number;
  MIN_SPAWN_INTERVAL: number;
  SPAWN_INTERVAL_DECREMENT: number;
  ENEMY_STARTING_POPULATION: number;
  STARTING_WAVE_SIZE: number;
  PLAYER_STARTING_RESOURCES: number;
  MOUSE_CONFIG: MouseConfig;
  FLOATING_TEXT_LIFESPAN: number;
  MIN_WAVE_SIZE: number;

  constructor() {
    this.CELL_SIZE = 50;
    this.CELL_GAP = 0;
    this.CANVAS_WIDTH = 900;
    this.CANVAS_HEIGHT = 600;
    this.TOWER_COST = 100;
    this.INITIAL_SPAWN_INTERVAL = 6000;
    this.MIN_SPAWN_INTERVAL = 600;
    this.SPAWN_INTERVAL_DECREMENT = 200;
    this.ENEMY_STARTING_POPULATION = 25;
    this.STARTING_WAVE_SIZE = 10;
    this.MIN_WAVE_SIZE = 20;
    this.PLAYER_STARTING_RESOURCES = 300;
    this.FLOATING_TEXT_LIFESPAN = 50;
    this.MOUSE_CONFIG = {
      MOUSE_STARTING_X: 10,
      MOUSE_STARTING_Y: 10,
      MOUSE_WIDTH: 0.1,
      MOUSE_HEIGHT: 0.1,
    };
  }
}
