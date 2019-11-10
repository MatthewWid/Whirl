const Manager = require("../Manager.js");

/**
 * @classdesc
 * The debug manager provides tools for debugging your game application by allowing you to log information about certain game objects, create warnings and error messages, and toggle between debug and non-debug mode to evaluate performance and logic errors.
 * 
 * @class DebugManager
 * @memberof Whirl.Game
 * @extends Whirl.Game.Manager
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
	 */
	warn(text, source = "Generic") {
		if (this._game.config.get("debug")) {
			console.warn(`Whirl | ${source} | ${text}`);
		}
	}

	/**
	 * Logs a formatted error message to the console.
	 * 
	 * Throws a newly instantiated `Error` object that can be caught like any other error if need be.
	 * 
	 * Executes regardless of whether the game is in debug mode or not.
	 * 
	 * @method Whirl.Game.DebugManager#error
	 * 
	 * @param {string} text Error message.
	 * @param {string} [source="Generic"] Source of the error.
	 */
	error(text, source = "Generic") {
		throw new Error(`Whirl | ${source} | ${text}`);
	}
}

module.exports = DebugManager;
