/**
 * Event class used internally to track event listeners, event data and the listeners' associated callback function.
 *
 * Abstractly represents a hook into an event and is responsible for augmenting the event data payload with the event metadata.
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

	call(source, data = {}) {
		this.func({
			_eId: this.eId,
			_eName: this.eName,
			_source: source,
			...data,
		});
	}
}

module.exports = Event;
