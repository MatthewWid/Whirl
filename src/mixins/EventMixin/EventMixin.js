import Mixin from "../Mixin";
import Listener from "./Listener";

/**
 * @classdesc
 * Event system used to listen on and emit events. Many Whirl objects come with their own premade events and in normal usage you simply need to hook into them, but you can also create your own custom events that can be emitted on and listened to.
 *
 * Events are identified by a string name. There can be multiple listeners on a single event that will all fire when that event is called/emitted. Listener callbacks are called in the order that the listeners were initially added in.
 *
 * Events do not have to be initialised before they can be listened or emitted on. You can add a listener for *any* event name and if something emits on the same event name the listener callback will be invoked. Similarly, you can emit on *any* event name whether there are listeners for that event or not.
 *
 * This mixin is stored under the `event` namespace.
 *
 * @class Event
 * @memberof Whirl.mixins
 * @extends Whirl.mixins.Mixin
 * @mixin
 *
 * @example
 * // Listen on the 'sayWord' event
 * object.event.on("sayWord", (word) => {
 * 	console.log(`My word is: ${word}.`);
 * });
 *
 * // Emit on the 'sayWord' event
 * object.event.emit("sayWord", "kitten"); // "My word is: kitten." is logged to the console
 *
 * @example
 * const {mixins: {Mixin, Event}} = Whirl;
 *
 * // Create a class `Person` with the `Event` mixin
 * class Person {
 * 	mixins = [Event];
 *
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 *
 * // Create an instance of a person
 * const person = new MyObject();
 *
 * // Listen for the 'sayHi' event on `person` and log "Hello world"
 * person.event.on("sayHi", () => {
 * 	console.log("Hello world");
 * });
 *
 * // "Hello world" is logged to the console
 * person.event.emit("sayHi");
 */
class EventMixin extends Mixin {
	/**
	 * @ignore
	 * @memberof Whirl.mixins.Event
	 * @type {string}
	 * @constant
	 * @override
	 */
	static _namespace = "event";

	/**
	 * Object used internally to store each event and their associated listeners.
	 *
	 * @memberof Whirl.mixins.Event#
	 * @type {object}
	 * @private
	 */
	_events = {};

	/**
	 * Tracks the next available ID of each event listener.
	 *
	 * Each listener applied to an event is given a unique ID that can then later be referenced to remove that specific listener from the event.
	 *
	 * @memberof Whirl.mixins.Event#
	 * @type {number}
	 * @private
	 */
	_index = 0;

	/**
	 * Callback that is fired each time the event is emitted on.
	 *
	 * @callback Whirl.mixins.Event~listenerCallback
	 * @param {*} data Custom data given when emitting on this event. Whirl guarantees the stable identity of this data object.
	 * @param {object} meta Contains meta-data about the event and the object being listened on.
	 * @param {number} meta.eventId Unique ID of this individual event listener. Can be used to remove this listener from the given event name.
	 * @param {string} meta.eventName Name of the event that this listener is listening on.
	 * @param {object} meta.source Object that the event is being fired on.
	 */

	/**
	 * Create a listener for the given event name.
	 *
	 * Optionally can listen only *once*, and after the first emit the listener will be removed.
	 *
	 * Listeners added with the `on` or `once` method are called in the order they are added in if that event is `emit`ted on.
	 *
	 * @method Whirl.mixins.Event#on
	 *
	 * @param {string} name Name of the event to listen on.
	 * @param {Whirl.mixins.Event~listenerCallback} callback Event listener invoked each time this event is emitted on.
	 * @param {boolean} [once=false] If set to `true`, will remove the event listener from the event after the first time the event is emitted on.
	 * @returns {object} Source object this mixin is bound to.
	 *
	 * @example
	 * object.event.once("sayHi", () => {
	 * 	console.log("Hi!");
	 * });
	 *
	 * object.event.emit("sayHi"); // "Hi!" is logged to the console
	 *
	 * @example
	 * const game = Whirl.createGame();
	 *
	 * // Listen for the `didStart` event on the game object
	 * game.event.on("didStart", (data) => {
	 * 	// `startTime` is attached to the `data` object by the emitter
	 * 	console.log(`Game started at ${Math.round(data.startTime)}ms after page load.`);
	 * // Only listen for the first game start
	 * }, true);
	 *
	 * // "Game started at 26ms after page load." is logged to console.
	 * game.start();
	 */
	on(name, callback, once = false) {
		const listener = new Listener(this._index++, name, callback, once);

		// Push onto array with given name or create if not exists
		(this._events[name] = this._events[name] || []).push(listener);

		return this._source;
	}

	/**
	 * Alias of the `on` method with its `once` argument set to `true`.
	 *
	 * After the first emission the listener will be removed.
	 *
	 * @method Whirl.mixins.Event#once
	 *
	 * @param {string} name Name of the event to listen on.
	 * @param {Whirl.mixins.Event~listenerCallback} listener Event listener invoked each time this event is emitted on.
	 * @returns {object} Source object this mixin is bound to.
	 *
	 * @example
	 * object
	 * 	.event.once("sayHi", () => {
	 * 		console.log("Hi!");
	 * 	})
	 * 	.event.emit("sayHi") // "Hi!" is logged to the console
	 * 	.event.emit("sayHi"); // No output
	 *
	 * @example
	 * // Wait for the first game update and then stop the game loop
	 * game.event.once("didUpdate", () => {
	 * 	game.stop();
	 * });
	 */
	once(name, callback) {
		return this.on(name, callback, true);
	}

	/**
	 * Emit to the given event, optionally attaching data to it.
	 *
	 * Immediately calls all listeners in the order that they were originally added in (first-to-last).
	 *
	 * @method Whirl.mixins.Event#emit
	 *
	 * @param {string} name Name of the event to emit to.
	 * @param {*} [data] Additional data payload related to the event.
	 * @returns {object} Source object this mixin is bound to.
	 *
	 * @example
	 * // Emit to the 'speak' event on the `person` object.
	 * person.event.emit("speak");
	 *
	 * @example
	 * // Emit to multiple events one after another.
	 * dog
	 * 	.event.emit("walk")
	 * 	.event.emit("talk", "Bark!")
	 * 	.event.emit("sit");
	 *
	 * @example
	 * // Emit to the 'warning' event on the 'errorLogger' object.
	 * // Attach 'severity' and 'message' properties to the data.
	 * errorLogger.event.emit("warning", {
	 * 	severity: "high",
	 * 	message: "Total system failure.",
	 * });
	 */
	emit(name, data = {}) {
		if (this._events[name]) {
			this._events[name].forEach((listener) => {
				listener.trigger(this._source, data);

				if (listener.once) {
					this.remove(name, listener);
				}
			});
		}

		return this._source;
	}

	/**
	 * Remove a specific event listener from listening on the given event name.
	 *
	 * Each event listener has a unique identification number that is passed to the callback function whenever the listener is emitted to (`eventId`). You can either provide the listener's ID or the listener instance itself to remove.
	 *
	 * *If you need to stop listening to an event after the first emission then you can use the {@link Whirl.mixins.Event#once|`once` method} when creating a listener instead.*
	 *
	 * @method Whirl.mixins.Event#remove
	 *
	 * @param {string} name Name of the event to remove the listener from.
	 * @param {number|Whirl.mixins.Event~Listener} listener Event ID or instance of an {@link Whirl.mixins.Event~Event|event listener} to remove.
	 * @returns {object} Source object this mixin is bound to.
	 *
	 * @example
	 * let id;
	 *
	 * person
	 * 	.event.on("speak", (message, meta) => {
	 * 			console.log(message);
	 *
	 * 			id = meta.eventId; // Store the ID of the event listener
	 * 	})
	 *
	 * 	.event.emit("speak", "Hello world") // "Hello world" logged to the console
	 *
	 * 	.event.remove("speak", id) // Remove the listener by its ID
	 *
	 * 	.event.emit("speak", "Hello again") // No output
	 */
	remove(name, listener) {
		if (!this._events[name]) {
			console.warn(
				`Whirl | EventMixin | Failed to remove event by ID from non-existent event pool "${name}".`
			);

			return this._source;
		}

		let eventId = -1;

		if (listener instanceof Listener) {
			eventId = listener.eventId;
		} else if (typeof listener === "number") {
			eventId = listener;
		} else {
			console.warn(
				`Whirl | EventMixin | Invalid event identifier given to EventMixin#remove "${listener}"`
			);

			return this._source;
		}

		this._events[name] = this._events[name].filter((listener) => listener.eventId !== eventId);

		// Clean up events with no more listeners
		if (this._events[name].length === 0) {
			delete this._events[name];
		}

		return this._source;
	}

	/**
	 * Remove *all* listeners from a specifc event name, or remove all listeners from all events.
	 *
	 * In general, you should never invoke this on events created by the engine itself (such as update and render loop events) as it may break the core functionality of the engine and produce unexpected errors.
	 *
	 * @method Whirl.mixins.Event#removeAll
	 *
	 * @param {string} [name] Name of the event to remove all listeners from.
	 *
	 * If not provided, removes all event listeners from all events on the object.
	 * @returns {this} The EventMixin instance.
	 *
	 * @example
	 * object.event.removeAll("sayHi");
	 *
	 * @example
	 * object.event.removeAll();
	 */
	removeAll(name) {
		if (name) {
			delete this._events[name];
		} else {
			this._events = {};
		}

		return this._source;
	}
}

export default EventMixin;
