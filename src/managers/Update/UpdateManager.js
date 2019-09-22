const Manager = require("../Manager.js");

class UpdateManager extends Manager {
	_frameRate = 60;
	_frameCount = 0;
	_running = false;

	constructor(game) {
		super(game);
	}

	get frameCount() {
		return this._frameCount;
	}
	get isRunning() {
		return this._running;
	}

	_start = () => {
		if (this.running) {
			return this._game;
		}

		// Event: willStart
		this._game.event.emit("willStart");

		this._running = true;
		this._update();

		return this._game;
	}

	_stop = () => {
		// Event: willStop
		this._game.event.emit("willStop");
		
		this._running = false;

		return this._game;
	}

	_update = () => {
		// Event: willUpdate
		this._game.event.emit("willUpdate", {
			frameCount: this._frameCount
		});

		this._frameCount++;

		// Event: didUpdate
		this._game.event.emit("didUpdate", {
			frameCount: this._frameCount
		});

		if (this._running) {
			requestAnimationFrame(this._update);
		} else {
			// Event: didStop
			this._game.event.emit("didStop", {
				frameCount: this._frameCount
			});
		}
	}
}

module.exports = UpdateManager;
