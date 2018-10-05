// MobSin.game

function Game() {
	// game.object               | game.o
	require("./gameObject")(this);
	this.object.init(this, "MobSin.Game", {event: true}, false);

	// game.assetManager         | game.a
	require("./assetManager")(this);

	// game.stageManager         | game.s
	require("./stageManager")(this);

	// game.viewportManager      | game.v
	require("./viewportManager")(this);

	// game.tweenManager         | game.t
	require("./tweenManager")(this);

	// game.input                | game.i
	require("./input")(this);

	// game.pluginManager        | game.p
	// Eg, MobSinQuickStart, MobSinDebugger, MatterJS, TweenJS, etc.

	let updater = require("./updater")(this);

	// game.setup                |
	require("./setup")(this);
}

module.exports = () => new Game();