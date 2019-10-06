/**
 * Event class used internally to track event listeners, event data and the listeners' associated callback function.
 * 
 * Abstractly represents a hook into an event and is responsible for augmenting the event data payload with the event metadata.
 * 
 * @typedef {object} Whirl.mixins.Event~Event
 */
class Event {
	_eId;
	_eName;
	_func;
	once;

	constructor(id, name, func, once = false) {
		this._eId = id;
		this._eName = name;
		this._func = func;
		this.once = once;
	}

	call(source, data = {}) {
		this._func({
			_eId: this._eId,
			_eName: this._eName,
			_source: source,
			...data,
		});
	}
}

module.exports = Event;
