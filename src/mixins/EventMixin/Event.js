/**
 * Event class used internally to track event listeners, event data and the listeners' associated callback function.
 *
 * Represents a hook into an event and is responsible for augmenting the event data with event meta-data such as the listener ID.
 *
 * @typedef {object} Whirl.mixins.Event~Event
 */
class Event {
	eId;
	eName;
	func;
	once;

	constructor(id, name, func, once = false) {
		this.eId = id;
		this.eName = name;
		this.func = func;
		this.once = once;
	}

	trigger(source, data = {}) {
		this.func({
			_eId: this.eId,
			_eName: this.eName,
			_source: source,
			...data,
		});
	}
}

module.exports = Event;
