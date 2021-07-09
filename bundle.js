/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/alien.ts":
/*!*********************!*\
  !*** ./js/alien.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var gameObject_1 = __webpack_require__(/*! ./gameObject */ "./js/gameObject.ts");
var Alien = /** @class */ (function (_super) {
    __extends(Alien, _super);
    function Alien(game, y, width, height, health, speed) {
        var _this = _super.call(this, game, game.canvas.width, y, width, height) || this;
        _this.id = Math.random();
        _this.speed = speed;
        _this.movement = _this.speed;
        _this.health = health;
        _this.maxHealth = _this.health;
        _this.lootValue = 20;
        return _this;
    }
    Alien.prototype.alive = function () {
        return this.health > 0;
    };
    Alien.prototype.update = function () {
        this.x -= this.movement;
    };
    Alien.prototype.draw = function () {
        this.game.ctx.save();
        this.game.ctx.fillStyle = "red";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillStyle = "black";
        this.game.ctx.font = "30px Arial";
        this.game.ctx.fillText(Math.floor(this.health) + "/" + Math.floor(this.maxHealth), this.x + 15, this.y + 30);
        this.game.ctx.restore();
    };
    return Alien;
}(gameObject_1.default));
exports.default = Alien;


/***/ }),

/***/ "./js/cell.ts":
/*!********************!*\
  !*** ./js/cell.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var gameObject_1 = __webpack_require__(/*! ./gameObject */ "./js/gameObject.ts");
var util_1 = __webpack_require__(/*! ./util */ "./js/util.ts");
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(game, x, y, width, height) {
        var _this = _super.call(this, game, x, y, width, height) || this;
        _this.highlighted = false;
        return _this;
    }
    Cell.prototype.update = function () {
        this.game.mouse.x &&
            this.game.mouse.y &&
            util_1.collisionDetection(this, this.game.mouse)
            ? (this.highlighted = true)
            : (this.highlighted = false);
    };
    Cell.prototype.draw = function () {
        this.game.ctx.save();
        if (this.highlighted) {
            this.game.ctx.strokeStyle = "black";
            this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
        this.game.ctx.restore();
    };
    return Cell;
}(gameObject_1.default));
exports.default = Cell;


/***/ }),

/***/ "./js/configuration.ts":
/*!*****************************!*\
  !*** ./js/configuration.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = {
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


/***/ }),

/***/ "./js/dom.ts":
/*!*******************!*\
  !*** ./js/dom.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Dom = /** @class */ (function () {
    function Dom() {
        this.canvas = document.getElementById("canvas");
        if (!this.canvas)
            throw new Error("could not find canvas element");
        this.nextWaveButton = (document.getElementById("next-wave"));
        if (!this.nextWaveButton)
            throw new Error("could not find next wave button");
        this.stats = document.getElementById("stats");
        if (!this.stats)
            throw new Error("could not find stats element");
        this.towerSelector = (document.getElementById("tower-selector"));
        if (!this.towerSelector)
            throw new Error("could not find tower selector element");
        this.towerStats = document.getElementById("tower-stats");
        if (!this.towerStats)
            throw new Error("could not find tower stats element");
    }
    return Dom;
}());
exports.default = Dom;


/***/ }),

/***/ "./js/floatingText.ts":
/*!****************************!*\
  !*** ./js/floatingText.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var configuration_1 = __webpack_require__(/*! ./configuration */ "./js/configuration.ts");
var FloatingText = /** @class */ (function () {
    function FloatingText(game, text, x, y, size, color) {
        this.game = game;
        this.text = text;
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.age = 0;
        this.opacity = 1;
    }
    FloatingText.prototype.expired = function () {
        return this.age >= configuration_1.default.FLOATING_TEXT_LIFESPAN;
    };
    FloatingText.prototype.update = function () {
        this.y -= 0.3;
        this.age += 1;
        if (this.opacity > 0.05)
            this.opacity -= 0.02;
    };
    FloatingText.prototype.draw = function () {
        this.game.ctx.save();
        this.game.ctx.globalAlpha = this.opacity;
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.font = this.size + "px Arial";
        this.game.ctx.fillText(this.text, this.x, this.y);
        this.game.ctx.globalAlpha = 1;
        this.game.ctx.restore();
    };
    return FloatingText;
}());
exports.default = FloatingText;


/***/ }),

/***/ "./js/game.ts":
/*!********************!*\
  !*** ./js/game.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var cell_1 = __webpack_require__(/*! ./cell */ "./js/cell.ts");
var mouse_1 = __webpack_require__(/*! ./mouse */ "./js/mouse.ts");
var tower_1 = __webpack_require__(/*! ./tower */ "./js/tower.ts");
var configuration_1 = __webpack_require__(/*! ./configuration */ "./js/configuration.ts");
var floatingText_1 = __webpack_require__(/*! ./floatingText */ "./js/floatingText.ts");
var population_1 = __webpack_require__(/*! ./population */ "./js/population.ts");
var Game = /** @class */ (function () {
    function Game(dom) {
        var _this = this;
        this.animate = function () {
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.handleGrid();
            _this.handleTowers();
            _this.handleProjectiles();
            _this.handleAliens();
            _this.handleFloatingTexts();
            _this.handleAttackWave();
            _this.handleGameStatsBar();
            if (!_this.gameOver)
                requestAnimationFrame(_this.animate);
        };
        // dom
        this.nextWaveButton = dom.nextWaveButton;
        this.stats = dom.stats;
        this.towerStats = dom.towerStats;
        this.towerSelector = dom.towerSelector;
        // canvas
        this.canvas = dom.canvas;
        this.canvas.width = configuration_1.default.CANVAS_WIDTH;
        this.canvas.height = configuration_1.default.CANVAS_HEIGHT;
        var ctx = this.canvas.getContext("2d");
        if (!ctx)
            throw new Error("Failed to get canvas context");
        this.ctx = ctx;
        // grid
        this.grid = [];
        // game objects
        this.towers = new Map();
        this.aliens = new Map();
        this.projectiles = [];
        this.floatingTexts = [];
        // alien population
        this.population = new population_1.default(this, configuration_1.default.ENEMY_STARTING_POPULATION);
        this.attackWave = [];
        // stats
        this.numResources = configuration_1.default.PLAYER_STARTING_RESOURCES;
        this.numKills = 0;
        this.waveCount = 0;
        // wave control
        this.waveInProgress = false;
        this.alienSpawnInterval = configuration_1.default.INITIAL_SPAWN_INTERVAL;
        this.waveSize = configuration_1.default.STARTING_WAVE_SIZE;
        this.lastSpawnedTime = 0;
        // controls bar
        this.selectedTowerCard = "";
        // mouse
        this.mouse = new mouse_1.default();
        // game status
        this.gameStarted = false;
        this.gameOver = false;
        this.initializeGrid();
        this.initializeControlsBar();
        this.handleMouse();
        this.handleCanvasClicks();
        this.handleNextWaveButton();
    }
    Game.prototype.start = function () {
        this.animate();
    };
    Game.prototype.handleMouse = function () {
        var _this = this;
        this.canvas.addEventListener("mousemove", function (e) {
            var canvasPosition = _this.canvas.getBoundingClientRect();
            _this.mouse.update(e.x - canvasPosition.left, e.y - canvasPosition.top);
        });
        this.canvas.addEventListener("mouseleave", function () {
            _this.mouse.update(0, 0);
        });
    };
    Game.prototype.initializeControlsBar = function () {
        var _this = this;
        var temp = Array.from(this.towerSelector.children);
        temp.forEach(function (child) {
            child.onclick = function () {
                if (_this.selectedTowerCard == child.innerText) {
                    _this.selectedTowerCard = "";
                    _this.towerStats.innerText = "";
                }
                else {
                    _this.selectedTowerCard = child.innerText;
                    switch (child.innerText) {
                        case "machine gun tower":
                            _this.towerStats.innerText = "cost: " + configuration_1.default.MACHINE_GUN_TOWER_STATS.cost[0];
                            break;
                        case "flamethrower tower":
                            _this.towerStats.innerText = "cost: " + configuration_1.default.FLAMETHROWER_TOWER_STATS.cost[0];
                            break;
                        default:
                            _this.towerStats.innerText = "selected " + _this.selectedTowerCard;
                            break;
                    }
                }
            };
        });
    };
    Game.prototype.purchaseTower = function (towerId, gridCellX, gridCellY) {
        var newTower;
        switch (this.selectedTowerCard) {
            case "machine gun tower":
                newTower = new tower_1.MachineGunTower(this, gridCellX, gridCellY);
                break;
            case "flamethrower tower":
                newTower = new tower_1.FlamethrowerTower(this, gridCellX, gridCellY);
                break;
            default:
                return;
        }
        if (newTower.cost >= this.numResources) {
            this.createFloatingText("insufficient resources", this.mouse.x, this.mouse.y);
        }
        else {
            this.numResources -= newTower.cost;
            this.selectedTowerCard = "";
            this.towerStats.innerText = "";
            this.towers.set(towerId, newTower);
        }
    };
    Game.prototype.selectTower = function (towerId) {
        var _this = this;
        this.towerStats.innerHTML = "";
        var tower = this.towers.get(towerId);
        if (tower instanceof tower_1.MachineGunTower ||
            tower instanceof tower_1.FlamethrowerTower) {
            this.towerStats.innerHTML = "<ul>\n        <li>power: " + tower.power + "</li>\n        <li>range: " + tower.range + "</li>\n        <li>cooldown: " + tower.cooldown + "</li>\n      </ul>";
            var upgradeCost_1 = configuration_1.default.MACHINE_GUN_TOWER_STATS.cost[tower.level];
            if (upgradeCost_1) {
                var upgradeButton = document.createElement("button");
                upgradeButton.innerText = "upgrade: " + upgradeCost_1;
                upgradeButton.addEventListener("click", function () {
                    if (_this.numResources >= upgradeCost_1) {
                        tower.upgrade();
                        _this.selectTower(towerId);
                    }
                    else {
                        _this.createFloatingText("insufficient resources", tower.x, tower.y);
                    }
                });
                this.towerStats.appendChild(upgradeButton);
            }
        }
    };
    Game.prototype.handleCanvasClicks = function () {
        var _this = this;
        this.canvas.addEventListener("click", function () {
            var gridCellX = _this.mouse.x - (_this.mouse.x % configuration_1.default.CELL_SIZE);
            var gridCellY = _this.mouse.y - (_this.mouse.y % configuration_1.default.CELL_SIZE);
            var towerId = gridCellX + "," + gridCellY;
            if (_this.towers.has(towerId)) {
                _this.selectedTowerCard = "";
                _this.selectTower(towerId);
            }
            if (_this.selectedTowerCard.length > 0 && !_this.towers.has(towerId)) {
                _this.purchaseTower(towerId, gridCellX, gridCellY);
            }
        });
    };
    Game.prototype.handleNextWaveButton = function () {
        var _this = this;
        this.nextWaveButton.addEventListener("click", function () {
            if (!_this.gameStarted)
                _this.gameStarted = true;
            _this.nextWaveButton.disabled = true;
            _this.nextWaveButton.innerText = "wave in progress";
            _this.waveCount += 1;
            if (_this.waveCount > 1)
                _this.population.reproduce();
            _this.waveSize = Math.floor(_this.population.population.length / 2);
            if (_this.waveSize <= configuration_1.default.MIN_WAVE_SIZE)
                _this.waveSize = Math.min(configuration_1.default.MIN_WAVE_SIZE, _this.population.population.length);
            _this.waveInProgress = true;
            _this.attackWave = _this.population.createAttackWave(_this.waveSize);
        });
    };
    Game.prototype.initializeGrid = function () {
        for (var y = 0; y < this.canvas.height; y += configuration_1.default.CELL_SIZE) {
            for (var x = 0; x < this.canvas.width; x += configuration_1.default.CELL_SIZE) {
                this.grid.push(new cell_1.default(this, x, y, configuration_1.default.CELL_SIZE, configuration_1.default.CELL_SIZE));
            }
        }
    };
    Game.prototype.handleGameStatsBar = function () {
        this.stats.innerText =
            "resources: " +
                this.numResources +
                " " +
                "kills: " +
                this.numKills +
                " " +
                "wave: " +
                this.waveCount +
                " " +
                "population: " +
                (this.population.population.length +
                    this.aliens.size +
                    this.attackWave.length);
    };
    Game.prototype.handleGrid = function () {
        var e_1, _a;
        try {
            for (var _b = __values(this.grid), _c = _b.next(); !_c.done; _c = _b.next()) {
                var cell = _c.value;
                cell.update();
                cell.draw();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Game.prototype.handleProjectiles = function () {
        var temp = [];
        this.projectiles.forEach(function (projectile) {
            projectile.update();
            projectile.draw();
            if (!projectile.destroyed())
                temp.push(projectile);
        });
        this.projectiles = temp;
    };
    Game.prototype.handleTowers = function () {
        this.towers.forEach(function (tower) {
            tower.update();
            tower.draw();
        });
    };
    Game.prototype.handleAliens = function () {
        var _this = this;
        this.aliens.forEach(function (alien, key) {
            alien.update();
            alien.draw();
            if (alien.x + alien.width < 0) {
                alien.x = _this.canvas.width;
                _this.population.population.push(alien);
                _this.aliens.delete(key);
            }
            if (!alien.alive()) {
                _this.aliens.delete(key);
                _this.createFloatingText("+" + alien.lootValue, alien.x, alien.y);
                _this.numResources += alien.lootValue;
                _this.numKills += 1;
            }
        });
        if (this.waveInProgress &&
            Date.now() - this.lastSpawnedTime > this.alienSpawnInterval) {
            var temp = this.attackWave.pop();
            if (temp) {
                this.aliens.set(temp.id, temp);
                this.lastSpawnedTime = Date.now();
                if (this.alienSpawnInterval > configuration_1.default.MIN_SPAWN_INTERVAL)
                    this.alienSpawnInterval -= configuration_1.default.SPAWN_INTERVAL_DECREMENT;
            }
        }
    };
    Game.prototype.handleAttackWave = function () {
        if (this.gameStarted && !this.waveInProgress) {
            this.nextWaveButton.disabled = false;
            this.nextWaveButton.innerText = "next wave";
        }
        if (this.attackWave.length == 0 && this.aliens.size == 0) {
            this.waveInProgress = false;
        }
    };
    Game.prototype.handleFloatingTexts = function () {
        var temp = [];
        this.floatingTexts.forEach(function (floatingText) {
            floatingText.update();
            floatingText.draw();
            if (!floatingText.expired()) {
                temp.push(floatingText);
            }
        });
        this.floatingTexts = temp;
    };
    Game.prototype.createFloatingText = function (text, x, y, color) {
        if (color === void 0) { color = "black"; }
        this.floatingTexts.push(new floatingText_1.default(this, text, x, y, 15, color));
    };
    return Game;
}());
exports.default = Game;


/***/ }),

/***/ "./js/gameObject.ts":
/*!**************************!*\
  !*** ./js/gameObject.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var GameObject = /** @class */ (function () {
    function GameObject(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    GameObject.prototype.update = function () { };
    GameObject.prototype.draw = function () { };
    return GameObject;
}());
exports.default = GameObject;


/***/ }),

/***/ "./js/mouse.ts":
/*!*********************!*\
  !*** ./js/mouse.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var configuration_1 = __webpack_require__(/*! ./configuration */ "./js/configuration.ts");
var Mouse = /** @class */ (function () {
    function Mouse() {
        this.x = configuration_1.default.MOUSE_CONFIG.MOUSE_STARTING_X;
        this.y = configuration_1.default.MOUSE_CONFIG.MOUSE_STARTING_Y;
        this.width = configuration_1.default.MOUSE_CONFIG.MOUSE_WIDTH;
        this.height = configuration_1.default.MOUSE_CONFIG.MOUSE_HEIGHT;
    }
    Mouse.prototype.update = function (x, y, w, h) {
        if (w === void 0) { w = this.width; }
        if (h === void 0) { h = this.height; }
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    };
    return Mouse;
}());
exports.default = Mouse;


/***/ }),

/***/ "./js/population.ts":
/*!**************************!*\
  !*** ./js/population.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var configuration_1 = __webpack_require__(/*! ./configuration */ "./js/configuration.ts");
var alien_1 = __webpack_require__(/*! ./alien */ "./js/alien.ts");
var util_1 = __webpack_require__(/*! ./util */ "./js/util.ts");
var Population = /** @class */ (function () {
    function Population(game, n) {
        this.game = game;
        this.population = [];
        this.maxHeight = configuration_1.default.ALIEN_TRAITS.MAX_HEIGHT;
        this.minHeight = configuration_1.default.ALIEN_TRAITS.MIN_HEIGHT;
        this.maxWidth = configuration_1.default.ALIEN_TRAITS.MAX_WIDTH;
        this.minWidth = configuration_1.default.ALIEN_TRAITS.MIN_WIDTH;
        this.maxHealth = configuration_1.default.ALIEN_TRAITS.MAX_HEALTH;
        this.minHealth = configuration_1.default.ALIEN_TRAITS.MIN_HEALTH;
        this.maxSpeed = configuration_1.default.ALIEN_TRAITS.MAX_SPEED;
        this.minSpeed = configuration_1.default.ALIEN_TRAITS.MIN_SPEED;
        this.initializePopulation(n);
    }
    Population.prototype.initializePopulation = function (n) {
        for (var i = 0; i < n; i++) {
            var height = util_1.randomNumberInRange(this.minHeight, this.maxHeight);
            this.population.push(new alien_1.default(this.game, util_1.randomNumberInRange(height, this.game.canvas.height - height), util_1.randomNumberInRange(this.minWidth, this.maxWidth), height, util_1.randomNumberInRange(this.minHealth, this.maxHealth), util_1.randomNumberInRange(this.minSpeed, this.maxSpeed)));
        }
    };
    Population.prototype.shufflePopulation = function () {
        // Fisher-Yates shuffle algorithm
        var count = this.population.length;
        var randomNumber = 0;
        var temp;
        while (count) {
            randomNumber = (Math.random() * count--) | 0;
            temp = this.population[count];
            this.population[count] = this.population[randomNumber];
            this.population[randomNumber] = temp;
        }
    };
    Population.prototype.createAttackWave = function (n) {
        this.shufflePopulation();
        var attackWave = [];
        for (var i = 0; i < n; i++) {
            var temp = this.population.pop();
            if (!temp)
                break;
            attackWave.push(temp);
        }
        return attackWave;
    };
    Population.prototype.reproduce = function () {
        var _this = this;
        var offspring = [];
        var start = 0;
        var mid = Math.floor(this.population.length / 2);
        while (mid < this.population.length) {
            var parent1 = this.population[start];
            var parent2 = this.population[mid];
            var height = util_1.randomNumberInRange(parent1.height, parent2.height);
            offspring.push(new alien_1.default(this.game, util_1.randomNumberInRange(height, this.game.canvas.height - height), util_1.randomNumberInRange(parent1.width, parent2.width), height, util_1.randomNumberInRange(parent1.maxHealth, parent2.maxHealth), util_1.randomNumberInRange(parent1.speed, parent2.speed)));
            start++;
            mid++;
        }
        offspring.forEach(function (child) {
            _this.population.push(child);
        });
    };
    return Population;
}());
exports.default = Population;


/***/ }),

/***/ "./js/projectile.ts":
/*!**************************!*\
  !*** ./js/projectile.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var gameObject_1 = __webpack_require__(/*! ./gameObject */ "./js/gameObject.ts");
var util_1 = __webpack_require__(/*! ./util */ "./js/util.ts");
var Projectile = /** @class */ (function (_super) {
    __extends(Projectile, _super);
    function Projectile(game, x, y, width, height, angle, speed, power, range) {
        var _this = _super.call(this, game, x, y, width, height) || this;
        _this.game = game;
        _this.x = x;
        _this.y = y;
        _this.startingX = x;
        _this.startingY = y;
        _this.angle = angle;
        _this.speed = speed;
        _this.power = power;
        _this.range = range;
        _this.width = width;
        _this.height = height;
        return _this;
    }
    Projectile.prototype.checkOutOfRange = function () {
        var deltaX = Math.abs(this.x - this.startingX);
        var deltaY = Math.abs(this.y - this.startingY);
        var dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        return dist > this.range;
    };
    Projectile.prototype.destroyed = function () {
        var e_1, _a;
        if (this.checkOutOfRange())
            return true;
        if (this.x > this.game.canvas.width ||
            this.x < 0 ||
            this.y > this.game.canvas.height ||
            this.y < 0) {
            return true;
        }
        try {
            for (var _b = __values(this.game.aliens.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var alien = _c.value;
                if (util_1.collisionDetection(this, alien)) {
                    alien.health -= this.power;
                    return true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    Projectile.prototype.update = function () {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    };
    Projectile.prototype.draw = function () {
        this.game.ctx.save();
        this.game.ctx.fillStyle = "black";
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        this.game.ctx.fill();
        this.game.ctx.restore();
    };
    return Projectile;
}(gameObject_1.default));
exports.default = Projectile;


/***/ }),

/***/ "./js/tower.ts":
/*!*********************!*\
  !*** ./js/tower.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlamethrowerTower = exports.MachineGunTower = void 0;
var configuration_1 = __webpack_require__(/*! ./configuration */ "./js/configuration.ts");
var projectile_1 = __webpack_require__(/*! ./projectile */ "./js/projectile.ts");
var gameObject_1 = __webpack_require__(/*! ./gameObject */ "./js/gameObject.ts");
var util_1 = __webpack_require__(/*! ./util */ "./js/util.ts");
var Tower = /** @class */ (function (_super) {
    __extends(Tower, _super);
    function Tower(game, x, y, cost) {
        var _this = _super.call(this, game, x, y, configuration_1.default.CELL_SIZE - configuration_1.default.CELL_GAP * 2, configuration_1.default.CELL_SIZE - configuration_1.default.CELL_GAP * 2) || this;
        _this.level = 1;
        _this.cost = cost;
        return _this;
    }
    return Tower;
}(gameObject_1.default));
exports.default = Tower;
var MachineGunTower = /** @class */ (function (_super) {
    __extends(MachineGunTower, _super);
    function MachineGunTower(game, x, y) {
        var _this = _super.call(this, game, x, y, configuration_1.default.MACHINE_GUN_TOWER_STATS.cost[0]) || this;
        _this.range = configuration_1.default.MACHINE_GUN_TOWER_STATS.range[0];
        _this.cooldown = configuration_1.default.MACHINE_GUN_TOWER_STATS.cooldown[0];
        _this.projectileSpeed = configuration_1.default.MACHINE_GUN_TOWER_STATS.projectileSpeed[0];
        _this.power = configuration_1.default.MACHINE_GUN_TOWER_STATS.power[0];
        _this.angle = 0;
        _this.target = null;
        _this.lastFired = Date.now();
        return _this;
    }
    MachineGunTower.prototype.upgrade = function () {
        if (this.level < 3) {
            this.level += 1;
            this.range = configuration_1.default.MACHINE_GUN_TOWER_STATS.range[this.level - 1];
            this.cooldown = configuration_1.default.MACHINE_GUN_TOWER_STATS.cooldown[this.level - 1];
            this.projectileSpeed =
                configuration_1.default.MACHINE_GUN_TOWER_STATS.projectileSpeed[this.level - 1];
            this.power = configuration_1.default.MACHINE_GUN_TOWER_STATS.power[this.level - 1];
        }
    };
    MachineGunTower.prototype.findTarget = function () {
        var e_1, _a;
        if (this.target && !this.game.aliens.has(this.target.id))
            this.target = null;
        if (!this.target) {
            try {
                for (var _b = __values(this.game.aliens.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var alien = _c.value;
                    if (util_1.calculateDistance(this, alien) < this.range) {
                        this.target = alien;
                        return;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    MachineGunTower.prototype.changeAngle = function () {
        if (this.target) {
            var dx = this.x - this.target.x;
            var dy = this.y - this.target.y;
            this.angle = Math.atan2(dy, dx) - Math.PI;
        }
    };
    MachineGunTower.prototype.checkFire = function () {
        if (this.target) {
            var now = Date.now();
            var distanceToTarget = util_1.calculateDistance(this, this.target);
            if (this.range > distanceToTarget) {
                if (now - this.lastFired > this.cooldown) {
                    this.game.projectiles.push(new projectile_1.default(this.game, this.x + this.width / 2, this.y + this.height / 2, 6, 6, this.angle, this.projectileSpeed, this.power, this.game.canvas.width));
                    this.lastFired = now;
                }
            }
            else {
                this.target = null;
            }
        }
    };
    MachineGunTower.prototype.draw = function () {
        this.game.ctx.save();
        this.game.ctx.fillStyle = "blue";
        this.game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.game.ctx.rotate(this.angle);
        this.game.ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillStyle = "black";
        this.game.ctx.font = "30px Arial";
        var barrel;
        switch (this.level) {
            case 2:
                barrel = "==";
                break;
            case 3:
                barrel = "===";
                break;
            default:
                barrel = "=";
                break;
        }
        this.game.ctx.fillText(barrel, this.x + 15, this.y + 30);
        if (this.game.mouse.x &&
            this.game.mouse.y &&
            util_1.collisionDetection(this, this.game.mouse)) {
            this.game.ctx.beginPath();
            var centerX = this.x + this.width / 2;
            var centerY = this.y + this.height / 2;
            this.game.ctx.arc(centerX, centerY, this.range, 0, Math.PI * 2);
            this.game.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
            this.game.ctx.fill();
        }
        this.game.ctx.restore();
    };
    MachineGunTower.prototype.update = function () {
        this.findTarget();
        this.changeAngle();
        this.checkFire();
    };
    return MachineGunTower;
}(Tower));
exports.MachineGunTower = MachineGunTower;
var FlamethrowerTower = /** @class */ (function (_super) {
    __extends(FlamethrowerTower, _super);
    function FlamethrowerTower(game, x, y) {
        var _this = _super.call(this, game, x, y, configuration_1.default.FLAMETHROWER_TOWER_STATS.cost[0]) || this;
        _this.range = configuration_1.default.FLAMETHROWER_TOWER_STATS.range[0];
        _this.cooldown = configuration_1.default.FLAMETHROWER_TOWER_STATS.cooldown[0];
        _this.projectileSpeed = configuration_1.default.FLAMETHROWER_TOWER_STATS.projectileSpeed[0];
        _this.power = configuration_1.default.FLAMETHROWER_TOWER_STATS.power[0];
        _this.angle = 0;
        _this.target = null;
        _this.lastFired = Date.now();
        return _this;
    }
    FlamethrowerTower.prototype.findTarget = function () {
        var e_2, _a;
        if (this.target && !this.game.aliens.has(this.target.id))
            this.target = null;
        if (!this.target) {
            try {
                for (var _b = __values(this.game.aliens.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var alien = _c.value;
                    if (util_1.calculateDistance(this, alien) < this.range) {
                        this.target = alien;
                        return;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    };
    FlamethrowerTower.prototype.upgrade = function () {
        if (this.level < 3) {
            this.level += 1;
            this.range = configuration_1.default.FLAMETHROWER_TOWER_STATS.range[this.level - 1];
            this.cooldown = configuration_1.default.FLAMETHROWER_TOWER_STATS.cooldown[this.level - 1];
            this.projectileSpeed =
                configuration_1.default.FLAMETHROWER_TOWER_STATS.projectileSpeed[this.level - 1];
            this.power = configuration_1.default.FLAMETHROWER_TOWER_STATS.power[this.level - 1];
        }
    };
    FlamethrowerTower.prototype.changeAngle = function () {
        if (this.target) {
            var dx = this.x - this.target.x;
            var dy = this.y - this.target.y;
            this.angle = Math.atan2(dy, dx) - Math.PI;
        }
    };
    FlamethrowerTower.prototype.checkFire = function () {
        if (this.target) {
            var now = Date.now();
            var distanceToTarget = util_1.calculateDistance(this, this.target);
            if (this.range > distanceToTarget) {
                if (now - this.lastFired > this.cooldown) {
                    this.game.projectiles.push(new projectile_1.default(this.game, this.x + this.width / 2, this.y + this.height / 2, configuration_1.default.FLAMETHROWER_TOWER_STATS.projectileSize[this.level - 1], configuration_1.default.FLAMETHROWER_TOWER_STATS.projectileSize[this.level - 1], this.angle, this.projectileSpeed, this.power, this.range));
                    this.lastFired = now;
                }
            }
            else {
                this.target = null;
            }
        }
    };
    FlamethrowerTower.prototype.draw = function () {
        this.game.ctx.save();
        this.game.ctx.fillStyle = "orange";
        this.game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        this.game.ctx.rotate(this.angle);
        this.game.ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.fillStyle = "black";
        this.game.ctx.font = "30px Arial";
        var barrel;
        switch (this.level) {
            case 2:
                barrel = "==";
                break;
            case 3:
                barrel = "===";
                break;
            default:
                barrel = "=";
                break;
        }
        this.game.ctx.fillText(barrel, this.x + 15, this.y + 30);
        if (this.game.mouse.x &&
            this.game.mouse.y &&
            util_1.collisionDetection(this, this.game.mouse)) {
            this.game.ctx.beginPath();
            var centerX = this.x + this.width / 2;
            var centerY = this.y + this.height / 2;
            this.game.ctx.arc(centerX, centerY, this.range, 0, Math.PI * 2);
            this.game.ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
            this.game.ctx.fill();
        }
        this.game.ctx.restore();
    };
    FlamethrowerTower.prototype.update = function () {
        this.findTarget();
        this.changeAngle();
        this.checkFire();
    };
    return FlamethrowerTower;
}(Tower));
exports.FlamethrowerTower = FlamethrowerTower;


/***/ }),

/***/ "./js/util.ts":
/*!********************!*\
  !*** ./js/util.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.calculateDistance = exports.randomNumberInRange = exports.collisionDetection = void 0;
function collisionDetection(first, second) {
    if (first.x >= second.x + second.width ||
        second.x >= first.x + first.width ||
        first.y >= second.y + second.height ||
        second.y >= first.y + first.height) {
        return false;
    }
    return true;
}
exports.collisionDetection = collisionDetection;
function randomNumberInRange(a, b) {
    var min = Math.min(a, b);
    var max = Math.max(a, b);
    return Math.random() * (max - min) + min;
}
exports.randomNumberInRange = randomNumberInRange;
function calculateDistance(first, second) {
    var deltaX = Math.abs(first.x - second.x);
    var deltaY = Math.abs(first.y - second.y);
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
}
exports.calculateDistance = calculateDistance;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./js/main.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var dom_1 = __webpack_require__(/*! ./dom */ "./js/dom.ts");
var game_1 = __webpack_require__(/*! ./game */ "./js/game.ts");
var dom = new dom_1.default();
var game = new game_1.default(dom);
game.start();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map