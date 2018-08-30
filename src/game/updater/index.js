// MobSin.game.updater

function update() {
	require("./renderer").bind(this)();
	if (this.running) {
		requestAnimationFrame(update.bind(this));
	}
}

// Start the game loop
function start() {
	this.running = true;
	requestAnimationFrame(update.bind(this));
}

// Stop the game loop
function stop() {
	this.running = false;
}

module.exports = (_game, presets = {}) => {
	_game.running = presets.running || false;
	_game.frameCount = 0;
	_game.frameRate = presets.frameRate || 60;
	
	_game.start = start.bind(_game);
	_game.stop = stop.bind(_game);
};