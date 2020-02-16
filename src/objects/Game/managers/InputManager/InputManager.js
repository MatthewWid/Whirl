const Manager = require("../Manager.js");
const MouseElement = require("./MouseElement.js");
const {Mixin, Event} = require("../../../../mixins/");
const {Point} = require("../../../../geometry/");

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
	mouseElements = [];

	/**
	 * Cache of unique DOM elements with keyboard-related event listeners attached to them.
	 *
	 * @memberof Whirl.Game.InputManager#
	 * @type {Whirl.Game.InputManager.KeyElement[]}
	 * @default []
	 */
	keyElements = [];

	constructor(game) {
		super(game);
	}

	/**
	 * Register an element to listen for mouse-related events, associated with a specific {@link Whirl.Viewport|Viewport}.
	 *
	 * If the DOM element already exists in the {@link Whirl.Game.InputManager#mouseElements|mouse element cache} then the Viewport will be added as a listener on the {@link Whirl.Game.InputManager.MouseElement|MouseElement}, else a new one will be created.
	 *
	 * Adds the {@link Whirl.mixins.Event|Event mixin} to the Viewport if it does not already have it.
	 *
	 * @method Whirl.Game.InputManager#registerMouseElement
	 *
	 * @param {string} selector Selector for the element to listen to mouse-related events on.
	 * @param {Whirl.Viewport} viewport Viewport to be added as a listener when mouse events fire on the element.
	 * @param {boolean} [attach=true] Automatically attach event listeners to the registered element.
	 *
	 * @example
	 * game.input.registerMouseElement("#canvas", viewport);
	 */
	registerMouseElement(selector, viewport, attach = true) {
		const element = document.querySelector(selector);

		if (!element) {
			return this.game.debug.error(
				"Failed to register mouse element - element from given selector does not exist.",
				"Whirl.Game#InputManager"
			);
		}

		let mouseElement = this.mouseElements.find((el) => el.element === element);

		if (mouseElement) {
			if (mouseElement.viewports.includes(viewport)) {
				return this.game.debug.error(
					"Failed to register viewport with mouse element - viewport is already listening on the given element.",
					"Whirl.Game#InputManager"
				);
			}

			mouseElement.viewports.push(viewport);
		} else {
			mouseElement = new MouseElement(this.game, element, viewport);

			this.mouseElements.push(mouseElement);
		}

		if (!viewport.event) {
			Mixin.apply(viewport, [Event]);
		}

		if (attach && !mouseElement.hasEvents) {
			mouseElement.attachEvents();
		}

		return mouseElement;
	}
}

module.exports = InputManager;
