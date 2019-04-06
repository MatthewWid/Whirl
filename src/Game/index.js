// MobSin.game

function Game(presets = {}) {
	// game.config
	require("./config")(this, presets);

	// game.object
	require("./gameObject")(this);
	this.object.init(this, "MobSin.Game", {event: true}, false);

	// game.assetManager
	require("./assetManager")(this);

	// game.stageManager
	require("./stageManager")(this);

	// game.viewportManager
	require("./viewportManager")(this);

	// game.tweenManager
	require("./tweenManager")(this);

	// game.input
	require("./input")(this);

	// game.pluginManager
	// Eg, MobSinQuickStart, MobSinDebugger, MobSinShorten, MatterJS, TweenJS, etc.
	require("./pluginManager")(this);

	let updater = require("./updater")(this);

	// game.setup
	require("./setup")(this);
}

module.exports = (...args) => new Game(...args);
