class UpdateManager {
	_game;
	_frameRate = 60;
	_frameCount = 0;
	_running = false;

	constructor(game) {
		this._game = game;
		game.start = this._start;
		game.stop = this._stop;
	}

	get frameCount() {
		return this._frameCount;
	}
	get isRunning() {
		return this._running;
	}

	_start = () => {
		this._running = true;
		this._update();
	}

	_stop = () => {
		this._running = false;
	}

	_update = () => {
		this._frameCount++;
		if (this._running) {
			requestAnimationFrame(this._update);
		}
	}
}

module.exports = UpdateManager;
