// MobSin.game

function Game() {
	this.running = false;
	this.frameCount = 0;
	this.frameRate = 60;

	// game.object               | game.o
	require("./gameObject")(this);

	// game.assetManager         | game.a
	require("./assetManager")(this);

	// game.viewportManager      | game.v
	require("./viewportManager")(this);

	// game.pluginManager        | game.p
}

module.exports = Game;