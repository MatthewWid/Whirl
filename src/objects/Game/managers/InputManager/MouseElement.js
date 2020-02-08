/**
 * @classdesc
 * A MouseElement represents an element that can be clicked on and will fire the associated Viewport event listeners.
 *
 * @class MouseElement
 * @memberof Whirl.Game.InputManager
 */
class MouseElement {
	/**
	 * Game instance this object belongs to.
	 *
	 * @memberof Whirl.Game.InputManager.MouseElement#
	 * @type {Whirl.Game}
	 * @readonly
	 */
	game;

	/**
	 * The actual element to listen for mouse clicks on.
	 *
	 * @memberof Whirl.Game.InputManager.MouseElement#
	 * @type {HTMLElement}
	 * @readonly
	 */
	element;

	/**
	 * List of viewports that listen for events on this element.
	 *
	 * @memberof Whirl.Game.InputManager.MouseElement#
	 * @type {Whirl.Viewport[]}
	 */
	viewports;

	/**
	 * Flag indicating whether the element has events attached to it or not.
	 *
	 * @memberof Whirl.Game.InputManager.MouseElement#
	 * @type {boolean}
	 */
	hasEvents = false;

	constructor(game, element, viewports) {
		this.game = game;

		this.element = element;

		this.viewports = Array.isArray(viewports) ? viewports : [viewports];
	}
}

module.exports = MouseElement;
