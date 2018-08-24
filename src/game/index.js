function Game() {
	let globalIndex = 0;

	this.running = false;
	this.frameCount = 0;

	require("./assetManager")(this);
}

module.exports = Game;