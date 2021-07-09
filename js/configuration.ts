export default {
  CELL_SIZE: 50,
  CELL_GAP: 0,
  CANVAS_WIDTH: 1350,
  CANVAS_HEIGHT: 900,
  ENEMY_STARTING_POPULATION: 25,
  STARTING_WAVE_SIZE: 10,
  MIN_WAVE_SIZE: 20,
  INITIAL_SPAWN_INTERVAL: 6000,
  MIN_SPAWN_INTERVAL: 600,
  SPAWN_INTERVAL_DECREMENT: 200,
  PLAYER_STARTING_RESOURCES: 500,
  FLOATING_TEXT_LIFESPAN: 50,
  ALIEN_TRAITS: {
    MAX_HEIGHT: 100,
    MIN_HEIGHT: 20,
    MAX_WIDTH: 100,
    MIN_WIDTH: 20,
    MAX_HEALTH: 300,
    MIN_HEALTH: 50,
    MAX_SPEED: 1.5,
    MIN_SPEED: 0.1,
  },
  MOUSE_CONFIG: {
    MOUSE_STARTING_X: -1,
    MOUSE_STARTING_Y: -1,
    MOUSE_WIDTH: 0.1,
    MOUSE_HEIGHT: 0.1,
  },
  MACHINE_GUN_TOWER_STATS: {
    cost: [100, 150, 300],
    range: [500, 525, 550],
    cooldown: [175, 150, 125],
    projectileSpeed: [7, 7, 7],
    power: [5, 7, 10],
  },
  FLAMETHROWER_TOWER_STATS: {
    cost: [125, 175, 350],
    range: [200, 210, 220],
    cooldown: [5, 5, 5],
    projectileSpeed: [15, 17, 20],
    projectileSize: [10, 15, 20],
    power: [0.5, 1, 3],
  },
};
