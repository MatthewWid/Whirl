// MobSin.game

function Game() {
	// game.object               | game.o
	require("./gameObject")(this);
	this.object.init(this, "MobSin.game", ["eventSystem"]);

	// game.assetManager         | game.a
	require("./assetManager")(this);

	// game.viewportManager      | game.v
	require("./viewportManager")(this);

	// game.pluginManager        | game.p

	let updater = require("./updater")(this);
}

module.exports = Game;