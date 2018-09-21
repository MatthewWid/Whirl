// MobSin.game

function Game() {
	// game.object               | game.o
	require("./gameObject")(this);
	this.object.init(this, "MobSin.game", {event: true});

	// game.assetManager         | game.a
	require("./assetManager")(this);

	// game.stageManager         | game.s
	require("./stageManager")(this);

	// game.viewportManager      | game.v
	require("./viewportManager")(this);

	// game.pluginManager        | game.p
	// Eg, MobSinQuickStart, MobSinDebugger, MatterJS, TweenJS

	let updater = require("./updater")(this);

	// game.setup                |
	require("./setup")(this);
}

module.exports = () => {
	return new Game();
};