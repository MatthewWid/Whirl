const Manager = require("../Manager.js");

/**
 * @classdesc
 * Update manager of the game instance that handles object updates, physics, timing, events and more.
 * 
 * This manager is stored under the `update` namespace.
 * 
 * @class UpdateManager
 * @memberof Whirl.Game
 * @extends Whirl.Game.Manager
 */
class UpdateManager extends Manager {
	/**
	 * Flag indicating whether the update loop is running or not.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {boolean}
	 * @readonly
	 */
	_running = false; // Update loop running or not
	_frameRate = 60; // Desired framerate per second
	_frameCount = 0; // Total updates
	_frameDelta = 0; // Time since last update
	_lastDelta = 0; // Last delta time calculated
	_startTime = 0; // Time at Game.start()
	_elapsedTime = 0; // Time since Game.start()
	_initTime; // Time at Game instantation

	constructor(game) {
		super(game);

		this._initTime = performance.now();
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
		this._game.event.emit("willStart", {
			initTime: this._initTime,
		});

		this._running = true;
		this._startTime = performance.now();
		this._elapsedTime = 0;

		requestAnimationFrame(this._update);
		
		// Event: didStart
		this._game.event.emit("didStart", {
			initTime: this._initTime,
			startTime: this._startTime,
		});

		return this._game;
	}

	_stop = () => {
		// Event: willStop
		this._game.event.emit("willStop", {
			startTime: this._startTime,
			elapsedTime: this._elapsedTime,
		});
		
		this._running = false;

		return this._game;
	}

	_update = (delta) => {
		// Event: willUpdate
		this._game.event.emit("willUpdate", {
			frameCount: this._frameCount,
			frameDelta: this._frameDelta,
			startTime: this._startTime,
			elapsedTime: this._elapsedTime,
		});

		this._frameCount++;
		this._elapsedTime += delta - this._startTime;
		this._frameDelta = delta - this._lastDelta;
		this._lastDelta = delta;

		// Event: didUpdate
		this._game.event.emit("didUpdate", {
			frameCount: this._frameCount,
			frameDelta: this._frameDelta,
			startTime: this._startTime,
			elapsedTime: this._elapsedTime,
		});

		if (this._running) {
			requestAnimationFrame(this._update);
		} else {
			// Event: didStop
			this._game.event.emit("didStop", {
				frameCount: this._frameCount,
				startTime: this._startTime,
				elapsedTime: this._elapsedTime,
			});
		}
	}
}

module.exports = UpdateManager;
