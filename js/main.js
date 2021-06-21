import Configuration from "./configuration";
import Game from "./game";

const config = new Configuration();
const game = new Game(config);
game.start();
