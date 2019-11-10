const Manager = require("../Manager.js");

/**
 * @classdesc
 * The update manager handles object updates, physics, timing, events and more. It provides the main methods for interacting with the current running state of the game instance, provides several useful event hooks that are commonly used in a typical application and, whilst being separate to the `RenderManager`, invokes the game rendering process after the update loop has completed each tick.
 * 
 * By default, an instantiated game is not running, and must be "started" by use of the update manager to begin the update loop *after* the necessary events, assets, listeners, etc. have been loaded.
 * 
 * This manager is stored under the `update` namespace of the game instance object.
 * 
 * @class UpdateManager
 * @memberof Whirl.Game
 * @extends Whirl.Game.Manager
 * 
 * @example
 * const game = Whirl.Game();
 * 
 * game.start();
 * 
 * game.stop();
 * 
 * @example
 * const game = Whirl.Game();
 * 
 * game.event.on("didUpdate", (data) => {
 * 	console.log(`A total of ${data.frameCount} frame(s) have elapsed.`);
 * });
 * 
 * game.start();
 * // > A total of 1 frame(s) have elapsed.
 * // > A total of 2 frame(s) have elapsed.
 * // ...
 */
class UpdateManager extends Manager {
	/**
	 * Flag indicating whether the update loop is running or not.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {boolean}
	 * @readonly
	 */
	_running = false;

	/**
	 * Current desired frame rate that the game updates at per second.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_frameRate = 60;

	/**
	 * Total frames elapsed whilst the game is running.
	 * 
	 * Stopping the game pauses the increment of this value. Starting the game again will continue incrementing it from its last value, it will not reset back to `0` after the game pauses.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_frameCount = 0;

	/**
	 * Time in milliseconds since the last update tick.
	 * 
	 * Indicates how long the last update tick took to process.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_frameDelta = 0;

	/**
	 * Time in milliseconds between the *last* update tick and the update tick before that.
	 * 
	 * Can be used for FPS and performance calculation by comparing how long the last update tick took and the current update tick took to process.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_lastDelta = 0;

	/**
	 * Timestamp in milliseconds of when the game was last started with the `start` method.
	 * 
	 * Subsequent calls to the `start` method will reset this value to the timestamp of the last call.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_startTime = 0;

	/**
	 * Time in milliseconds since the game was last started with the `start` method.
	 * 
	 * Subsequent calls to the `start` method will reset this value to the time delta between now and the last call to the `start` method (initially zero and then increasing).
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_elapsedTime = 0;

	/**
	 * Timestamp in milliseconds of when the game was instantiated.
	 * 
	 * This value is only set the first time that the game instance is created and remains constant after that.
	 * 
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	_initTime;

	constructor(game) {
		super(game);

		this._initTime = performance.now();
	}

	/**
	 * Start the game update loop.
	 * 
	 * This initiates the update loop to begin running and it will run indefinitely until the `_stop` method is invoked.
	 * 
	 * Also aliased directly under the game instance object as the `start` method.
	 * 
	 * @method Whirl.Game.UpdateManager#_start
	 * 
	 * @returns {this}
	 * 
	 * @example
	 * const game = Whirl.Game();
	 * 
	 * game.start();
	 * // or
	 * game.update._start();
	 */
	_start = () => {
		if (this.running) {
			return this._game;
		}

		/**
		 * Fires when the game `start` method is invoked but *before* its running state and timing-related properties are changed and/or reset.
		 * 
		 * @event Whirl.Game#willStart
		 * @type {object}
		 * 
		 * @property {number} initTime Timestamp in milliseconds of when the game was instantiated.
		 */
		this._game.event.emit("willStart", {
			initTime: this._initTime,
		});

		this._running = true;
		this._startTime = performance.now();
		this._elapsedTime = 0;

		requestAnimationFrame(this._update);
		
		/**
		 * Fires when the game `start` method is invoked *after* its running state and timing-related properties have changed and/or reset.
		 * 
		 * Timing is not guarunteed in terms of if this event will be fired before or after the first consequent update tick has executed.
		 * 
		 * @event Whirl.Game#didStart
		 * @type {object}
		 * 
		 * @property {number} initTime Timestamp in milliseconds of when the game was instantiated.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 */
		this._game.event.emit("didStart", {
			initTime: this._initTime,
			startTime: this._startTime,
		});

		return this._game;
	}

	/**
	 * Stops the entire game update loop.
	 * 
	 * This requests that the update manager cease execution of the update and (implicitely) the render loop before the next frame executes.
	 * 
	 * Note that this is a **request** to stop the game execution. Its timing is not exact in that one extra update tick may occur after this method is invoked as the update manager attempts to perform cleanup and keeps the game state consistent by not stopping in the middle of its update process.
	 * 
	 * In general you should never completely stop the execution of the game update loop after it has been started. The game update loop is essential for user input, asset loading, resizing, etc. Even if you are implementing something such as a pause screen for your game you should aim to pause the *physics* simulation of the game, not the game itself.
	 * 
	 * Also aliased directly under the game instance object as the `stop` method.
	 * 
	 * @method Whirl.Game.UpdateManager#_stop
	 * 
	 * @returns {this}
	 * 
	 * @example
	 * const game = Whirl.Game().start();
	 * 
	 * game.stop();
	 * // or
	 * game.update._stop();
	 */
	_stop = () => {
		/**
		 * Fires when the game `stop` method is invoked but *before* its running state and timing-related properties are changed and/or reset.
		 * 
		 * @event Whirl.Game#willStop
		 * @type {object}
		 * 
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 * @property {number} elapsedTime Time in milliseconds since the game was started.
		 */
		this._game.event.emit("willStop", {
			startTime: this._startTime,
			elapsedTime: this._elapsedTime,
		});
		
		this._running = false;

		return this._game;
	}

	/**
	 * Actual method that performs one update tick of the game instance.
	 * 
	 * @ignore
	 * @method Whirl.Game.UpdateManager#_update
	 * 
	 * @param {number} delta High resolution time in milliseconds given by the environment.
	 */
	_update = (delta) => {
		/**
		 * Fires just before the update logic of the game executes.
		 * 
		 * @event Whirl.Game#willUpdate
		 * @type {object}
		 * 
		 * @property {number} frameCount Total frames elapsed whilst the game is running.
		 * @property {number} frameDelta Time in milliseconds since the last update tick.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 * @property {number} elapsedTime Time in milliseconds since the game was started.
		 */
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

		/**
		 * Fires after the update logic of the game executes.
		 * 
		 * @event Whirl.Game#didUpdate
		 * @type {object}
		 * 
		 * @property {number} frameCount Total frames elapsed whilst the game is running.
		 * @property {number} frameDelta Time in milliseconds since the last update tick.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 * @property {number} elapsedTime Time in milliseconds since the game was started.
		 */
		this._game.event.emit("didUpdate", {
			frameCount: this._frameCount,
			frameDelta: this._frameDelta,
			startTime: this._startTime,
			elapsedTime: this._elapsedTime,
		});

		if (this._running) {
			requestAnimationFrame(this._update);
		} else {
			/**
			 * Fires after the game `stop` method is invoked and after a single update tick has occured.
			 * 
			 * This event is not immediately fired when the `stop` method is invoked as the update manager waits a game cycle before actually stopping the game to perform cleanup and keep the game state consistent.
			 * 
			 * @event Whirl.Game#didStop
			 * @type {object}
			 * 
			 * @property {number} frameCount Total frames elapsed whilst the game is running.
			 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
			 * @property {number} elapsedTime Time in milliseconds since the game was started.
			 */
			this._game.event.emit("didStop", {
				frameCount: this._frameCount,
				startTime: this._startTime,
				elapsedTime: this._elapsedTime,
			});
		}
	}
}

module.exports = UpdateManager;
