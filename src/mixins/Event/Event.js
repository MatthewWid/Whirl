class Event {
	_eId;
	_func;
	once;

	constructor(id, func, once = false) {
		this._eId = id;
		this._func = func;
		this.once = once;
	}

	call(source, data = {}) {
		this._func({
			_eId: this._eId,
			_source: source,
			...data,
		});
	}
}

module.exports = Event;
