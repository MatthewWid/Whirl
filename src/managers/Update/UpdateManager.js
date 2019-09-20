class UpdateManager {
	_game;
	_frameRate = 60;
	_frameCount = 0;
	_running = false;

	constructor(game) {
		this._game = game;
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

		return this._game;
	}

	_stop = () => {
		this._running = false;

		return this._game;
	}

	_update = () => {
		this._frameCount++;
		if (this._running) {
			requestAnimationFrame(this._update);
		}
	}
}

module.exports = UpdateManager;
