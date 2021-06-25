import Configuration from "./configuration";

export default class Mouse {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(config: Configuration) {
    this.x = config.MOUSE_CONFIG.MOUSE_STARTING_X;
    this.y = config.MOUSE_CONFIG.MOUSE_STARTING_Y;
    this.width = config.MOUSE_CONFIG.MOUSE_WIDTH;
    this.height = config.MOUSE_CONFIG.MOUSE_HEIGHT;
  }

  update(x: number, y: number, w = this.width, h = this.height) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}
