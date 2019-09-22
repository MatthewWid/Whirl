const Mixin = require("../Mixin.js");
const Event = require("./Event.js");

class EventMixin extends Mixin {
	static _namespace = "event";
	
	_events = {};
	_index = 0;

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

	once(name, func) {
		return this.on(name, func, true);
	}

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

	remove(name, event) {
		if (!this._events[name]) {
			console.warn(`Whirl | EventMixin | Failed to remove event by ID from non-existent event pool "${name}".`);
			return;
		}

		let _eId = -1;

		// (string, Event)
		if (event instanceof Event) {
			_eId = event._eId;
		// (string, number)
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

	removeAll(name) {
		delete this._events[name];

		return this;
	}
}

module.exports = EventMixin;
