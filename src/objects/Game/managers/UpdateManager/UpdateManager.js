const Manager = require("../Manager.js");

/**
 * @classdesc
 * The update manager handles object updates, physics, timing, events and more. It provides the main methods for interacting with the current running state of the game instance, provides several useful event hooks that are commonly used in a typical application and, whilst being separate to the `RenderManager`, invokes the game rendering process after the update loop has completed each tick.
 *
 * By default, an instantiated game is not running, and must be "started" by use of the update manager to begin the update loop *after* the necessary events, assets, listeners, etc. have been loaded.
 *
 * @class UpdateManager
 * @memberof Whirl.Game
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
	running = false;

	/**
	 * Current desired frame rate that the game updates at per second.
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	frameRate = 60;

	/**
	 * Total frames elapsed whilst the game is running.
	 *
	 * Stopping the game pauses the increment of this value. Starting the game again will continue incrementing it from its last value, it will not reset back to `0` after the game pauses.
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	frameCount = 0;

	/**
	 * Time in milliseconds since the last update tick.
	 *
	 * Indicates how long the last update tick took to process.
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	frameDelta = 0;

	/**
	 * Time in milliseconds between the *last* update tick and the update tick before that.
	 *
	 * Can be used for FPS and performance calculation by comparing how long the last update tick took and the current update tick took to process.
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	lastDelta = 0;

	/**
	 * Timestamp in milliseconds of when the game was last started with the `start` method.
	 *
	 * Subsequent calls to the `start` method will reset this value to the timestamp of the last call.
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	startTime = 0;

	/**
	 * Time in milliseconds since the game was last started with the `start` method.
	 *
	 * Subsequent calls to the `start` method will reset this value to the time delta between now and the last call to the `start` method (initially zero and then increasing).
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	elapsedTime = 0;

	/**
	 * Timestamp in milliseconds of when the game was instantiated.
	 *
	 * This value is only set the first time that the game instance is created and remains constant after that.
	 *
	 * @memberof Whirl.Game.UpdateManager#
	 * @type {number}
	 * @readonly
	 */
	initTime;

	constructor(game) {
		super(game);

		this.initTime = performance.now();
	}

	/**
	 * Start the game update loop.
	 *
	 * This initiates the update loop to begin running and it will run indefinitely until the `stop` method is invoked.
	 *
	 * Does nothing if the game {@link Whirl.Game.UpdateManager#running|is already running}.
	 *
	 * May also be invoked directly under the game instance object with {@link Whirl.Game#start|the `<game>.start` method}.
	 *
	 * @method Whirl.Game.UpdateManager#start
	 *
	 * @emits Whirl.Game#willStart
	 * @emits Whirl.Game#didStart
	 *
	 * @returns {Whirl.Game} Game instance the UpdateManager belongs to.
	 *
	 * @example
	 * const game = Whirl.Game();
	 *
	 * game.update.start();
	 */
	start = () => {
		if (this.running) {
			return this.game;
		}

		/**
		 * Fires when the game `start` method is invoked but *before* its running state and timing-related properties are changed and/or reset.
		 *
		 * @event Whirl.Game#willStart
		 * @type {object}
		 *
		 * @property {Whirl.Game} game Current game instance.
		 * @property {number} initTime Timestamp in milliseconds of when the game was instantiated.
		 */
		this.game.event.emit("willStart", {
			game: this.game,
			initTime: this.initTime,
		});

		this.running = true;
		this.startTime = performance.now();
		this.elapsedTime = 0;

		requestAnimationFrame(this._update);

		/**
		 * Fires when the game `start` method is invoked *after* its running state and timing-related properties have changed and/or reset.
		 *
		 * Timing is not guarunteed in terms of if this event will be fired before or after the first consequent update tick has executed.
		 *
		 * @event Whirl.Game#didStart
		 * @type {object}
		 *
		 * @property {Whirl.Game} game Current game instance.
		 * @property {number} initTime Timestamp in milliseconds of when the game was instantiated.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 */
		this.game.event.emit("didStart", {
			game: this.game,
			initTime: this.initTime,
			startTime: this.startTime,
		});

		return this.game;
	};

	/**
	 * Stops the entire game update loop.
	 *
	 * This requests that the update manager cease execution of the update and (implicitely) the render loop before the next frame executes.
	 *
	 * Note that this is a **request** to stop the game execution. Its timing is not exact in that one extra update tick may occur after this method is invoked as the update manager attempts to perform cleanup and keeps the game state consistent by not stopping in the middle of its update process.
	 *
	 * In general you should never completely stop the execution of the game update loop after it has been started. The game update loop is essential for user input, asset loading, window scaling, etc. Even if you are implementing something such as a pause screen for your game you should aim to pause the *physics* simulation of the game, not the game itself.
	 *
	 * May also be invoked directly under the game instance object with {@link Whirl.Game#start|the `<game>.start` method}.
	 *
	 * @method Whirl.Game.UpdateManager#stop
	 *
	 * @emits Whirl.Game#willStop
	 *
	 * @returns {Whirl.Game} Game instance the UpdateManager belongs to.
	 *
	 * @example
	 * const game = Whirl.Game();
	 *
	 * game.update.start();
	 *
	 * game.update.stop();
	 */
	stop = () => {
		/**
		 * Fires when the game `stop` method is invoked but *before* its running state and timing-related properties are changed and/or reset.
		 *
		 * @event Whirl.Game#willStop
		 * @type {object}
		 *
		 * @property {Whirl.Game} game Current game instance.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 * @property {number} elapsedTime Time in milliseconds since the game was started.
		 */
		this.game.event.emit("willStop", {
			game: this.game,
			startTime: this.startTime,
			elapsedTime: this.elapsedTime,
		});

		this.running = false;

		return this.game;
	};

	/**
	 * Conducts one update tick of the game instance.
	 *
	 * @ignore
	 * @method Whirl.Game.UpdateManager#_update
	 *
	 * @emits Whirl.Game#willUpdate
	 * @emits Whirl.Game#didUpdate
	 * @emits Whirl.Game#didStop
	 *
	 * @param {number} delta High resolution time in milliseconds given by the environment.
	 */
	_update = (delta) => {
		/**
		 * Fires just before the update logic of the game begins.
		 *
		 * @event Whirl.Game#willUpdate
		 * @type {object}
		 *
		 * @property {Whirl.Game} game Current game instance.
		 * @property {number} frameCount Total frames elapsed whilst the game is running.
		 * @property {number} frameDelta Time in milliseconds since the last update tick.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 * @property {number} elapsedTime Time in milliseconds since the game was started.
		 */
		this.game.event.emit("willUpdate", {
			game: this.game,
			frameCount: this.frameCount,
			frameDelta: this.frameDelta,
			startTime: this.startTime,
			elapsedTime: this.elapsedTime,
		});

		this.frameCount++;
		this.elapsedTime += delta - this.startTime;
		this.frameDelta = delta - this.lastDelta;
		this.lastDelta = delta;

		const stages = this.game.object._stages;
		for (let i = 0; i < stages.length; i++) {
			stages[i].calculateDerived();
		}
		const viewports = this.game.object._viewports;
		for (let i = 0; i < viewports.length; i++) {
			viewports[i].calculateDerived();
		}

		this.game.render._render();

		/**
		 * Fires after the update and rendering step of the game takes place.
		 *
		 * @event Whirl.Game#didUpdate
		 * @type {object}
		 *
		 * @property {Whirl.Game} game Current game instance.
		 * @property {number} frameCount Total frames elapsed whilst the game is running.
		 * @property {number} frameDelta Time in milliseconds since the last update tick.
		 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
		 * @property {number} elapsedTime Time in milliseconds since the game was started.
		 */
		this.game.event.emit("didUpdate", {
			game: this.game,
			frameCount: this.frameCount,
			frameDelta: this.frameDelta,
			startTime: this.startTime,
			elapsedTime: this.elapsedTime,
		});

		if (this.running) {
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
			 * @property {Whirl.Game} game Current game instance.
			 * @property {number} frameCount Total frames elapsed whilst the game is running.
			 * @property {number} startTime Timestamp in milliseconds of when the game was last started.
			 * @property {number} elapsedTime Time in milliseconds since the game was started.
			 */
			this.game.event.emit("didStop", {
				game: this.game,
				frameCount: this.frameCount,
				startTime: this.startTime,
				elapsedTime: this.elapsedTime,
			});
		}
	};
}

module.exports = UpdateManager;
