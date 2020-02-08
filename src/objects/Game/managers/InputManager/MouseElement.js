/**
 * @classdesc
 * A MouseElement represents an element that can listen on mouse-related events and will fire the associated Viewport event listeners when done so.
 *
 * @class MouseElement
 * @memberof Whirl.Game.InputManager
 *
 * @param {Whirl.Game} game Game instance this object belongs to and should be managed by.
 * @param {HTMLElement} element DOM element to attach event listeners to.
 * @param {Whirl.Viewport|Whirl.Viewport[]} viewports One or many viewports that are rendered to the given element and receive event emissions when mouse events are fired on that element.
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
	 * These viewports must have the {@link Whirl.mixins.Event|Event mixin} applied to them (automatically added by default when {@link Whirl.Game.InputManager#registerMouseElement|registering the mouse element}) and will have events emitted on them when this MouseElement receives mouse input inside {@link Whirl.Viewport#bounds|the viewport bounds}.
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

	listeners = [];

	constructor(game, element, viewports) {
		this.game = game;

		this.element = element;

		this.viewports = Array.isArray(viewports) ? viewports : [viewports];
	}

	/**
	 * Create an event listener and map its raw event name to a custom emit name. Returns an object that implements the [EventListener interface](https://developer.mozilla.org/en-US/docs/Web/API/EventListener) and can handle raw DOM events and adds it to the {@link Whirl.Game.InputManager.MouseElement#listeners|list of listeners}.
	 *
	 * @method Whirl.Game.InputManager.MouseElement#createListener
	 *
	 * @param {string} rawName Name of the [native DOM mouse event](https://developer.mozilla.org/en-US/docs/Web/Events#Mouse_events) to listen on.
	 * @param {string} emitName Event name to emit on the listener (Eg, `mouseLB`).
	 */
	createListener = (rawName, emitName) => {
		const listener = {
			rawName,
			emitName,
			handleEvent: (event) => {
				if (!this.game.config.get("input mouse")) {
					return;
				}

				if (this.game.config.get("input preventDefault")) {
					event.preventDefault();
				}

				const {clientX: mX, clientY: mY} = event;

				for (let i = 0; i < this.viewports.length; i++) {
					const viewport = this.viewports[i];
					const elementPos = viewport.translateToElement(mX, mY);

					if (elementPos && viewport.bounds.isPointInside(elementPos)) {
						const screenPos = viewport.translateToScreen(elementPos);
						const worldPos = viewport.translateToWorld(screenPos);

						viewport.event.emit(emitName, {
							event,
							elementPos,
							screenPos,
							worldPos,
						});
					}
				}
			},
		};

		this.element.addEventListener(rawName, listener);

		this.listeners.push(listener);
	};

	/**
	 * Attach all mouse event listeners to the element. Logs a warning and does nothing if the element already has listeners attached.
	 *
	 * @method Whirl.Game.InputManager.MouseElement#attachEvents
	 */
	attachEvents() {
		if (this.hasEvents) {
			return this.game.debug.warn(
				"Failed to attach mouse events - MouseElement already has events attached.",
				"Whirl.Game.InputManager.MouseElement"
			);
		}

		this.createListener("click", "mouseLB");
		this.createListener("contextmenu", "mouseRB");

		this.hasEvents = true;
	}

	/**
	 * Remove all mouse event listeners from the element and clear the {@link Whirl.Game.InputManager.MouseElement#listeners|listeners list}.
	 *
	 * @method Whirl.Game.InputManager.MouseElement#removeEvents
	 */
	removeEvents() {
		this.listeners.forEach((listener) => {
			this.element.removeEventListener(listener.rawName, listener);
		});

		this.listeners = [];
	}
}

module.exports = MouseElement;
