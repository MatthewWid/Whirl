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
