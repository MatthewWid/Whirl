const Manager = require("../Manager.js");
const MouseElement = require("./MouseElement.js");

/**
 * @classdesc
 * The input manager provides utilities for handling user input to your game and takes input events from the mouse and keyboard.
 *
 * @class InputManager
 * @memberof Whirl.Game
 */
class InputManager extends Manager {
	/**
	 * Cache of unique DOM elements with mouse-related event listeners attached to them, associated with Viewports.
	 *
	 * @memberof Whirl.Game.InputManager#
	 * @type {Whirl.Game.InputManager.MouseElement[]}
	 * @default []
	 */
	mouseElementCache = [];

	/**
	 * Cache of unique DOM elements with keyboard-related event listeners attached to them.
	 *
	 * @memberof Whirl.Game.InputManager#
	 * @type {Whirl.Game.InputManager.KeyElement[]}
	 * @default []
	 */
	keyElementCache = [];

	constructor(game) {
		super(game);
	}

	/**
	 * Register an element to listen for mouse-related events, associated with a specific {@link Whirl.Viewport|Viewport}.
	 *
	 * If the DOM element already exists in the {@link Whirl.Game.InputManager#mouseElementCache|mouse element cache} then the Viewport will be added as a listener on the {@link Whirl.Game.InputManager.MouseElement|MouseElement}, else a new one will be created.
	 *
	 * @param {string} selector Selector for the element to listen to mouse-related events on.
	 * @param {Whirl.Viewport} viewport Viewport to be added as a listener when mouse events fire on the element.
	 *
	 * @example
	 * game.input.registerMouseElement("#canvas", viewport);
	 */
	registerMouseElement(selector, viewport) {
		const element = document.querySelector(selector);

		if (!element) {
			this._game.debug.error(
				"Failed to register mouse element - element from given selector does not exist",
				"Whirl.Game#InputManager"
			);

			return;
		}

		const existingElement = this.mouseElementCache.find((el) => el.element === element);

		if (existingElement) {
			existingElement.viewports.push(viewport);
		} else {
			this.mouseElementCache.push(new MouseElement(this._game, element, viewport));
		}
	}
}

module.exports = InputManager;
