const Manager = require("../Manager.js");

/**
 * @classdesc
 * The debug manager provides tools for debugging your game application by allowing you to log information about certain game objects, create warnings and error messages, and toggle between debug and non-debug mode to evaluate performance and logic errors.
 *
 * @class DebugManager
 * @memberof Whirl.Game
 */
class DebugManager extends Manager {
	constructor(game) {
		super(game);
	}

	/**
	 * Logs a formatted warning message to the console.
	 *
	 * This method is typically only used internally, but you can manually invoke it yourself if you wish to create custom warning messages.
	 *
	 * Only executes if the game is in debug mode. Otherwise, does nothing.
	 *
	 * @method Whirl.Game.DebugManager#warn
	 *
	 * @param {string} text Warning message.
	 * @param {string} [source="Generic"] Source of the warning.
	 * @returns {string|null} Copy of the formatted message that was logged to console or `null` if the game is not in debug mode.
	 *
	 * @example
	 * game.config.set("debug", true); // Enable debug-mode
	 *
	 * // > "Whirl | Generic | Something could go wrong!"
	 * game.debug.warn("Something could go wrong!");
	 *
	 * @example
	 * game.config.set("debug", false); // Disable debug-mode
	 *
	 * // Doesn't log, returns `null`
	 * game.debug.warn("Something could go wrong!");
	 */
	warn(text, source = "Generic") {
		if (this._game.config.get("debug")) {
			const msg = `Whirl | ${source} | ${text}`;

			console.warn(msg);

			return msg;
		}

		return null;
	}

	/**
	 * Logs a formatted error message to the console.
	 *
	 * Does not actually `throw` an `Error`, meaning program execution will not stop when this method is invoked. However, you can manually throw an error and assign its error message to the return value of this method to simulate that effect.
	 *
	 * Executes regardless of whether the game is in debug mode or not.
	 *
	 * @method Whirl.Game.DebugManager#error
	 *
	 * @param {string} text Error message.
	 * @param {string} [source="Generic"] Source of the error.
	 * @returns {string} Copy of the formatted message that was logged to console.
	 *
	 * @example
	 * // > "Whirl | Generic | Something went wrong!"
	 * game.debug.error("Something went wrong!");
	 *
	 * @example
	 * // > "Whirl | SocketIO | Could not connect to the webserver."
	 * game.debug.error("Could not connect to the webserver.", "SocketIO");
	 */
	error(text, source = "Generic") {
		const msg = `Whirl | ${source} | ${text}`;

		console.error(msg);

		return msg;
	}
}

module.exports = DebugManager;
