(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
// MobSin.js v0.0.1
// By MatthewWid

let MobSin = {
	game: require("./game"), // Game instance
	eventSystem: require("./eventSystem"),
	childSystem: require("./childSystem"),
	shapes: require("./shapes"), // Shapes and geometry
	text: require("./text") // Advanced text
};
MobSin.game.container = MobSin;

module.exports = MobSin;
global.MobSin = MobSin;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./childSystem":2,"./eventSystem":3,"./game":6,"./shapes":7,"./text":8}],2:[function(require,module,exports){
module.exports = () => {
	return "childSystem -> index.js";
};
},{}],3:[function(require,module,exports){
module.exports = (that) => {
	that.events = {};

	that.events = that.e = {
		on: (name, func) => {
			if (that.events[name]) {
				that.events[name].push(func);
			} else {
				that.events[name] = [func];
			}
		},
		emit: (name, data) => {
			if (that.events[name]) {
				for (let i = 0, n = that.events[name].length; i < n; i++) {
					that.events[name][i](data);
				}
			}
			return false;
		}
	};
};
},{}],4:[function(require,module,exports){
// MobSin.game.assetManager

module.exports = (_game) => {
	function Asset(name, type, src) {
		_game.object.init(this, [
			"eventSystem"
		]);

		this.name = name;
		this.type = type;
		this.src = src;

		this.data._loaded = false;

		switch (this.type) {
			case "image": {
				this.img = new Image();
				this.img.addEventListener("load", () => {
					console.log("Loaded image: " + this.name);
				});
				this.img.src = this.src;
				break;
			}
			// audio
			// json
			// rawtext
		}
	}

	_game.assets = [];

	_game.assetManager = {
		add: (assetList) => {
			if (typeof assetList == "object" && !Array.isArray(assetList)) {
				let newInd = _game.assets.push(
					new Asset(assetList.name, assetList.type, assetList.src)
				) - 1;
				return _game.assets[newInd];
			} else if (Array.isArray(assetList)) {
				for (let i = 0, n = assetList.length; i < assetList.length; i++) {
					_game.assetManager.add(assetList[i]);
				}
			}
		},
		get: (name) => {
			return _game.assets.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.assets;
		}
	};
	_game.a = _game.assetManager; // ALias to game.a
};
},{}],5:[function(require,module,exports){
// MobSin.game.gameObject

module.exports = (_game) => {
	_game.globalIndex = 0;

	_game.object = {
		init: (that, presets) => {
			that._id = _game.globalIndex++;
			that._type = "";

			that.data = {};

			if (presets && presets.length > 0) {
				if (presets.indexOf("eventSystem") != -1 || presets.indexOf("eSys") != -1) {
					require("../../eventSystem")(that);
				}
				if (presets.indexOf("childSystem") != -1 || presets.indexOf("cSys") != -1) {
					require("../../eventSystem")(that);
				}
			}
		},
		nextID: () => {
			return _game.globalIndex++;
		}
	};
	_game.o = _game.object;
};
},{"../../eventSystem":3}],6:[function(require,module,exports){
function Game() {
	this.running = false;
	this.frameCount = 0;

	// game.object               | game.o
	require("./gameObject")(this);

	// game.assetManager         | game.a
	require("./assetManager")(this);

	// game.viewportManager      | game.v

	// game.pluginManager        | game.p
}

module.exports = Game;
},{"./assetManager":4,"./gameObject":5}],7:[function(require,module,exports){
module.exports = () => {
	return "shapes -> index.js";
};
},{}],8:[function(require,module,exports){
module.exports = () => {
	return "text -> index.js";
};
},{}]},{},[1]);
