// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateKeysMap = exports.keysMap = void 0;
var keysMap = {};
exports.keysMap = keysMap;
var UsableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'];

var populateKeysMap = function populateKeysMap() {
  if (UsableKeys.includes(event.code)) {
    keysMap[event.code] = event.type == 'keydown';
  }
};

exports.populateKeysMap = populateKeysMap;
},{}],"canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctx = exports.canvas = void 0;
var canvas = document.getElementById('board');
exports.canvas = canvas;
var ctx = canvas.getContext("2d");
exports.ctx = ctx;
},{}],"hero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetHero = exports.drawHero = exports.hero = void 0;

var _canvas = require("./canvas");

var _keys = require("./keys");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var heroDefault = {
  speed: 6,
  width: 30,
  height: 30,
  x: _canvas.canvas.width / 2 - 20,
  y: _canvas.canvas.height - 60,
  hit: false,
  opacity: 1
};

var hero = _objectSpread({}, heroDefault);

exports.hero = hero;

var moveHero = function moveHero() {
  if (_keys.keysMap['ArrowUp']) {
    hero.y -= hero.speed;
  }

  if (_keys.keysMap['ArrowDown']) {
    hero.y += hero.speed;
  }

  if (_keys.keysMap['ArrowLeft']) {
    hero.x -= hero.speed;
  }

  if (_keys.keysMap['ArrowRight']) {
    hero.x += hero.speed;
  } // Wall collision


  hero.x = Math.max(Math.min(hero.x, _canvas.canvas.width - hero.width), 0);
  hero.y = Math.max(Math.min(hero.y, _canvas.canvas.height - hero.height), 0);
};

var opacityDirection = -1;

var drawHero = function drawHero() {
  moveHero();

  if (hero.hit) {
    hero.opacity += opacityDirection * 0.08;
    if (hero.opacity <= 0.2) opacityDirection = 1;
    if (hero.opacity >= 1) opacityDirection = -1;
    _canvas.ctx.fillStyle = "rgb(223, 147, 80, ".concat(hero.opacity, ")");
  } else {
    hero.opacity = 1;
    _canvas.ctx.fillStyle = "rgb(0, 0, 0, ".concat(hero.opacity, ")");
  }

  _canvas.ctx.fillRect(hero.x, hero.y, hero.width, hero.height);
};

exports.drawHero = drawHero;

var resetHero = function resetHero() {
  exports.hero = hero = _objectSpread({}, heroDefault);
};

exports.resetHero = resetHero;
},{"./canvas":"canvas.js","./keys":"keys.js"}],"collision.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collision = void 0;

var collision = function collision(r, h) {
  var xin = h.x + h.width >= r.x && h.x <= r.x + r.width;
  var yin = h.y + h.height >= r.y && h.y <= r.y + r.height;
  return xin && yin;
};

exports.collision = collision;
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.random = void 0;

var random = function random(max, min) {
  return Math.random() * (max - min) + min;
};

exports.random = random;
},{}],"life.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetLife = exports.generateLife = exports.drawLife = exports.life = exports.lifeDefault = void 0;

var _canvas = require("./canvas");

var _hero = require("./hero");

var _collision = require("./collision");

var _game = require("./game");

var _utils = require("./utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var lifeDefault = {
  width: 10,
  height: 10,
  collided: false,
  y: -500,
  x: 100
};
exports.lifeDefault = lifeDefault;

var life = _objectSpread({}, lifeDefault);

exports.life = life;

var moveLife = function moveLife() {
  if ((0, _collision.collision)(life, _hero.hero)) {
    _game.game.lifes += 1;
    life.y = -100;
    life.collided = true;
  }

  life.y += life.speed;
};

var drawLife = function drawLife() {
  if (!life.collided) {
    moveLife();
    _canvas.ctx.fillStyle = 'rgb(25, 174, 97)';

    _canvas.ctx.fillRect(life.x, life.y, life.width, life.height);
  }
};

exports.drawLife = drawLife;

var generateLife = function generateLife() {
  if (life.y < 0 || life.y > _canvas.canvas.height) {
    life.x = (0, _utils.random)(10, _canvas.canvas.width - 20);
    life.y = (0, _utils.random)(-200, -800);
    life.speed = (0, _utils.random)(1, 3);
    life.collided = false;
  }
};

exports.generateLife = generateLife;

var resetLife = function resetLife() {
  exports.life = life = _objectSpread({}, lifeDefault);
};

exports.resetLife = resetLife;
},{"./canvas":"canvas.js","./hero":"hero.js","./collision":"collision.js","./game":"game.js","./utils":"utils.js"}],"game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLevel = exports.gameOver = exports.reset = exports.drawStatusBar = exports.game = exports.gameDefault = exports.statusBar = void 0;

var _life = require("./life");

var _hero = require("./hero");

var _enemies = require("./enemies");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var statusBar = document.getElementById('status-bar');
exports.statusBar = statusBar;
var lifesCount = document.getElementById('lifes');
var gameStatus = document.getElementById('game-status');
var stageCount = document.getElementById('stage');
var gameDefault = {
  lifes: 1,
  stage: 0,
  paused: true,
  over: false
};
exports.gameDefault = gameDefault;

var game = _objectSpread({}, gameDefault);

exports.game = game;
var previousGame = {
  lifes: null,
  stage: null,
  paused: null
};

var drawStatusBar = function drawStatusBar() {
  if (game.lifes !== previousGame.lifes) {
    lifesCount.innerHTML = "\u2665 ".concat(game.lifes);
    previousGame.lifes = game.lifes;
  }

  if (game.paused !== previousGame.paused) {
    gameStatus.innerHTML = "".concat(game.paused ? '&#10074;&#10074;' : '▶');
    previousGame.paused = game.paused;
  }

  if (game.stage !== previousGame.stage) {
    stageCount.innerText = "Stage ".concat(game.stage);
    previousGame.stage = game.stage;
  }
};

exports.drawStatusBar = drawStatusBar;

var reset = function reset() {
  (0, _hero.resetHero)();
  (0, _life.resetLife)();
  (0, _enemies.resetEnemies)();
  exports.game = game = _objectSpread({}, gameDefault);
};

exports.reset = reset;

var gameOver = function gameOver() {
  game.paused = true;
  game.over = true;
};

exports.gameOver = gameOver;

var updateLevel = function updateLevel() {
  game.stage += 1;
  (0, _life.generateLife)();
  (0, _enemies.generateEnemies)();
};

exports.updateLevel = updateLevel;
},{"./life":"life.js","./hero":"hero.js","./enemies":"enemies/index.js"}],"enemies/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetEnemies = exports.drawEnemies = exports.generateEnemies = void 0;

var _canvas = require("../canvas");

var _hero = require("../hero");

var _collision = require("../collision");

var _game = require("../game");

var _utils = require("../utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var enemiesCount = 50;
var enemies = [];

var generateEnemies = function generateEnemies() {
  enemies = [].concat(_toConsumableArray(enemies), _toConsumableArray(_toConsumableArray(Array(enemiesCount + _game.game.stage).keys()).map(function (_) {
    return {
      speed: (0, _utils.random)(0.1, Math.min(1 + _game.game.stage, _hero.hero.speed - 1)),
      width: 30,
      height: 30,
      x: (0, _utils.random)(-20, _canvas.canvas.width - 20),
      y: (0, _utils.random)(-1000, -30)
    };
  })));
};

exports.generateEnemies = generateEnemies;

var hitHero = function hitHero(enemy) {
  if (!_hero.hero.hit && (0, _collision.collision)(enemy, _hero.hero)) {
    _hero.hero.hit = true;
    _game.game.lifes -= 1;
    setTimeout(function () {
      _hero.hero.hit = false;
    }, 2000);
  }
};

var moveEnemies = function moveEnemies() {
  enemies.forEach(function (enemy, index) {
    removeEnemyNotShown(enemy, index);
    hitHero(enemy);
    enemy.y += enemy.speed;
  });
};

var drawEnemies = function drawEnemies() {
  if (enemies.length <= 50) (0, _game.updateLevel)();
  moveEnemies();
  enemies.forEach(function (enemy) {
    _canvas.ctx.fillStyle = "rgb(165, 77, 105)";

    _canvas.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
};

exports.drawEnemies = drawEnemies;

var removeEnemyNotShown = function removeEnemyNotShown(enemy, index) {
  if (enemy.y > _canvas.canvas.height) {
    enemies.splice(index, 1);
  }
};

var resetEnemies = function resetEnemies() {
  enemies = [];
};

exports.resetEnemies = resetEnemies;
},{"../canvas":"canvas.js","../hero":"hero.js","../collision":"collision.js","../game":"game.js","../utils":"utils.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _keys = require("./keys");

var _canvas = require("./canvas");

var _enemies = require("./enemies");

var _life = require("./life");

var _hero = require("./hero");

var _game = require("./game");

var draw = function draw() {
  _canvas.ctx.clearRect(0, 0, _canvas.canvas.width, _canvas.canvas.height);

  (0, _enemies.drawEnemies)();
  (0, _life.drawLife)();
  (0, _hero.drawHero)();
  (0, _game.drawStatusBar)();
};

var update = function update() {
  setTimeout(function () {
    if (_game.game.over && _keys.keysMap['Space']) (0, _game.reset)();
    draw();
    if (_game.game.lifes === 0) (0, _game.gameOver)();
    if (!_game.game.paused) requestAnimationFrame(update);
  }, 1000 / 60);
};

var start = function start() {
  _game.game.paused = false;
  update();
};

var pause = function pause() {
  _game.game.paused = true;
  update();
};

var togglePause = function togglePause() {
  _game.game.paused ? start() : pause();
};

_canvas.canvas.addEventListener('click', function () {
  _canvas.canvas.focus();
});

_canvas.canvas.addEventListener('focus', function () {
  start();
});

_canvas.canvas.addEventListener('blur', function () {
  pause();
});

window.addEventListener('keydown', function () {
  if (event.code === 'Space') togglePause();
  (0, _keys.populateKeysMap)();
});
window.addEventListener('keyup', function () {
  (0, _keys.populateKeysMap)();
});
},{"./keys":"keys.js","./canvas":"canvas.js","./enemies":"enemies/index.js","./life":"life.js","./hero":"hero.js","./game":"game.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49251" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.map