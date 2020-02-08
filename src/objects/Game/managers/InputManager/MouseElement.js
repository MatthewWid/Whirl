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

	listeners = [];

	constructor(game, element, viewports) {
		this.game = game;

		this.element = element;

		this.viewports = Array.isArray(viewports) ? viewports : [viewports];
	}

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

		console.log(rawName, listener);

		this.element.addEventListener(rawName, listener);

		this.listeners.push(listener);
	};

	attachEvents() {
		if (this.hasEvents) {
			return this.game.debug.error(
				"Failed to attach mouse events - MouseElement already has events attached.",
				"Whirl.Game.InputManager.MouseElement"
			);
		}

		this.createListener("click", "mouseLB");
		this.createListener("contextmenu", "mouseRB");

		this.hasEvents = true;
	}

	removeEvents() {
		this.listeners.forEach((listener) => {
			this.element.removeEventListener(listener.rawName, listener);
		});

		this.listeners = [];
	}
}

module.exports = MouseElement;
