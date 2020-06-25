/**
 * Class used internally to track event listeners, event data and the listeners' associated callback function.
 *
 * Represents a hook into an event and is responsible for augmenting the event data with event meta-data such as the listener ID.
 *
 * @typedef {object} Whirl.mixins.Event~Listener
 */
class Listener {
	eventId;
	eventName;
	callback;
	once;

	constructor(eventId, eventName, callback, once = false) {
		this.eventId = eventId;
		this.eventName = eventName;
		this.callback = callback;
		this.once = once;
	}

	trigger(source, data = {}) {
		this.callback({
			_eId: this.eventId,
			_eName: this.eventName,
			_source: source,
			...data,
		});
	}
}

module.exports = Listener;
