export default class Configuration {
  constructor() {
    this.CELL_SIZE = 50;
    this.CELL_GAP = 0;
    this.CANVAS_WIDTH = 900;
    this.CANVAS_HEIGHT = 600;
    this.DEFENDER_COST = 100;
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
