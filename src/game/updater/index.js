// MobSin.game.updater

let renderer = require("./renderer");

// Main game loop
function update() {
	this.event.emit("willUpdate", {
		game: this,
		frameCount: this.frameCount
	});

	for (let i = 0, n = this.stages.length; i < n; i++) {
		let objectList = this.stages[i]._sortChildren();

		for (let j = 0, m = objectList.length; j < m; j++) {
			let object = objectList[j];

			object._calculatePhysBounds();
		}
	}
	
	this.frameCount++;
	this.event.emit("didUpdate", {
		game: this,
		frameCount: this.frameCount
	});

	renderer.bind(this)();
	if (this.running) {
		requestAnimationFrame(update.bind(this));
	}
}

// Start the game loop
function start() {
	if (!this.running) {
		this.running = true;
		this.event.emit("willStart");
		requestAnimationFrame(update.bind(this));
	}

	return this;
}

// Stop the game loop
function stop() {
	if (this.running) {
		this.running = false;
		this.event.emit("willStop");
	}

	return this;
}

module.exports = (_game, presets = {}) => {
	_game.running = presets.running || false;
	_game.frameCount = 0;
	_game.frameRate = presets.frameRate || 60;
	
	_game.start = start.bind(_game);
	_game.stop = stop.bind(_game);
};