class Event {
	_eId;
	_func;
	once;

	constructor(id, func, once = false) {
		this._eId = id;
		this._func = func;
		this.once = once;
	}

	call(data = {}) {
		this._func({
			_eId: this._eId,
			...data
		});
	}
}

module.exports = Event;
