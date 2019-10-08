const Mixin = require("../Mixin.js");
const Event = require("./Event.js");

/**
 * @classdesc
 * Event system that Whirl uses to emit information from objects that can be hooked into by listeners on that object. Many Whirl objects come with their own premade events and in normal usage you'll just be hooking into them, but you can also make your own that listen on or emit events from any object with the EventMixin applied to it.
 * 
 * Events are identified by a string name. There can be multiple listeners on a single event that will all fire when that event is called/emitted. Listener callbacks are called in the order that the listeners were initially added in.
 * 
 * Event emitters do not have to be initialised beforehand. You can listen on *any* event name and it will be fired once something emits on that same event name. Similarly, you can emit to any event name regardless of if there are listeners listening to that event or not.
 * 
 * @class Event
 * @memberof Whirl.mixins
 * @extends Whirl.mixins.Mixin
 * @mixin
 * 
 * @example
 * const {mixins: {Mixin, Event}} = Whirl;
 * 
 * // Create and instantiate a class MyObject with the `Event` mixin
 * class MyObject {
 * 	mixins = [Event];
 * 
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 * const obj = new MyObject();
 * 
 * // Listen for the 'sayHi' event on `obj` and log "Hello world"
 * obj.event.on("sayHi", () => {
 * 	console.log("Hello world");
 * });
 * 
 * obj.event.emit("sayHi"); // "Hello world" is logged to the console
 * 
 * @example
 * obj.event.on("sayWord", (data) => {
 * 	console.log(`My word is: ${data.word}.`);
 * });
 * 
 * // "My word is: kitten." is logged to the console
 * obj.event.emit("sayWord", {
 * 	word: "kitten",
 * });
 */
class EventMixin extends Mixin {
	/**
	 * This mixin is stored under the `event` namespace.
	 * 
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
	 * @callback Whirl.mixins.Event~eventListener
	 * @param {object} data Contains metadata about the event and object being listened. Any data given in the event emit is also attached to this data object.
	 * @param {number} data._eId Unique ID of this individual event listener. Can be used to remove this listener from the given event name.
	 * @param {string} data._eName Name of the event that this listener is listening on.
	 * @param {object} data._source Object that the event is being fired on.
	 */

	/**
	 * Create a listener for the given event name.
	 * 
	 * Optionally can listen only *once*, and after the first emit the listener will be removed.
	 * 
	 * @method Whirl.mixins.Event#on
	 * 
	 * @param {string} name Name of the event to listen on.
	 * @param {Whirl.mixins.Event~eventListener} func Event listener invoked each time this event is emitted on.
	 * @param {boolean} [once=false] If set to `true`, will remove the event listener from listening on the event after the first time the event is emitted on.
	 * 
	 * @example
	 * const game = Whirl.Game({canvas: "#myCanvas"});
	 * 
	 * game.event.on("didStart", (data) => { // Listen for the `didStart` event on the game object
	 * 	console.log(`Game started at ${Math.round(data.startTime)}ms after page load.`); // `startTime` is attached to the `data` object by the emitter
	 * }, true); // Only listen for the first game start
	 * 
	 * game.start(); // "Game started at 26ms after page load." is logged to console.
	 */
	on(name, func, once = false) {
		const event = new Event(
			this._index++,
			name,
			func,
			once
		);

		// Push onto array with given name or create if not exists
		(this._events[name] = this._events[name] || []).push(event);

		return this;
	}

	/**
	 * Alias of the `on` method with its `once` argument set to `true`.
	 * 
	 * After the first emission to the event the listener will be removed.
	 * 
	 * @method Whirl.mixins.Event#once
	 * 
	 * @param {string} name Name of the event to listen on.
	 * @param {Whirl.mixins.Event~eventListener} func Event listener invoked each time this event is emitted on.
	 * 
	 * @example
	 * // Wait for the first game physics update and then stop the game loop
	 * game.event.once("didUpdate", () => {
	 * 	game.stop();
	 * });
	 */
	once(name, func) {
		return this.on(name, func, true);
	}

	/**
	 * Emit to the given event with optional data attached to the event payload.
	 * 
	 * Immediately invokes the array of listeners in the sequential order that they were originally added in.
	 * 
	 * @method Whirl.mixins.Event#emit
	 * 
	 * @param {string} name Name of the event to emit to.
	 * @param {object} [data] Additional data to give to all event listeners.
	 * 
	 * @example
	 * // Emit to the 'eventName' event on the `obj` object.
	 * obj.event.emit("eventName");
	 * 
	 * @example
	 * errorLogger.event.emit("warning", {
	 * 	severity: "high",
	 * 	message: "Total system failure.",
	 * });
	 */
	emit(name, data = {}) {
		if (this._events[name]) {
			this._events[name].forEach((event) => {
				// Call event callback with event ID appended to data
				event.call(this._source, data);

				// If event should only be called once then remove it
				if (event.once) {
					this.remove(name, event);
				}
			});

			return true;
		}

		return false;
	}

	/**
	 * Manually remove an event listener from the given event.
	 * 
	 * Each event listener has a unique identification number that is passed to the callback function whenever the listener is emitted to.
	 * 
	 * If you need to stop listening to an event after the first emission then you can use the `once` method when creating a listener instead.
	 * 
	 * @method Whirl.mixins.Event#remove
	 * 
	 * @param {string} name Name of the event to remove the listener from.
	 * @param {number|Whirl.mixins.Event~Event} event Event ID or physical instance of an Event object to remove.
	 * 
	 * @example
	 * let id;
	 *
	 * obj.event.on("sayHi", (data) => {
	 * 	console.log("Hello world");
	 * 
	 * 	id = data._eId; // store the ID of the event listener
	 * });
	 *
	 * obj.event.emit("sayHi"); // "Hello world" logged to the console
	 *
	 * obj.event.remove("sayHi", id); // Remove the listener by its ID
	 *
	 * obj.event.emit("sayHi"); // No output
	 */
	remove(name, event) {
		if (!this._events[name]) {
			console.warn(`Whirl | EventMixin | Failed to remove event by ID from non-existent event pool "${name}".`);
			return;
		}

		let _eId = -1;

		if (event instanceof Event) {
			_eId = event._eId;
		} else if (typeof event === "number") {
			_eId = event;
		}

		this._events[name] = this._events[name].filter((event) => event._eId !== _eId);

		// Clean up empty event name arrays
		if (this._events[name].length === 0) {
			delete this._events[name];
		}

		return this;
	}

	/**
	 * Remove *all* listeners from a given event name.
	 * 
	 * In general, you should never invoke this on events created by the engine itself (such as update and render loop events) as it may break the functionality of the engine and produce unexpected errors.
	 * 
	 * @method Whirl.mixins.Event#removeAll
	 * 
	 * @param {string} name Name of the event to remove the listeners from.
	 * 
	 * @example
	 * obj.event.removeAll("sayHi");
	 */
	removeAll(name) {
		delete this._events[name];

		return this;
	}
}

module.exports = EventMixin;
