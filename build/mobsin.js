(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
// MobSin.js v0.0.1
// By MatthewWid

let MobSin = {
	game: require("./game"), // Game instance
	shapes: require("./shapes"), // Shapes and geometry
};

module.exports = MobSin;
global.MobSin = MobSin;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./game":3,"./shapes":4}],2:[function(require,module,exports){
module.exports = (_game) => {
	function Asset(name, type, src) {
		// Default types

		this.name = name;
		this.type = type;
		this.src = src;

		this.loaded = false;
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
		}
	};
	_game.a = _game.assetManager;
};
},{}],3:[function(require,module,exports){
function Game() {
	let globalIndex = 0;

	this.running = false;
	this.frameCount = 0;

	require("./assetManager")(this);
}

module.exports = Game;
},{"./assetManager":2}],4:[function(require,module,exports){
module.exports = () => {
	return "shapes -> index.js";
};
},{}]},{},[1]);
