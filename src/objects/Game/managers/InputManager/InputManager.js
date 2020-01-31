const Manager = require("../Manager.js");

/**
 * @classdesc
 * The input manager provides utilities for handling user input to your game and takes input events from the mouse and keyboard.
 *
 * @class InputManager
 * @memberof Whirl.Game
 */
class InputManager extends Manager {
	constructor(game) {
		super(game);
	}
}

module.exports = InputManager;
