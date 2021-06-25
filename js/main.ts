import Configuration from "./configuration";
import Dom from "./dom";
import Game from "./game";

const config = new Configuration();
const dom = new Dom();
const game = new Game(dom, config);
game.start();
