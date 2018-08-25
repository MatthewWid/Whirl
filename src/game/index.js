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