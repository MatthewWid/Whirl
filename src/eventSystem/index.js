// MobSin.eventSystem

module.exports = (_obj) => {
	_obj.events = {
		_index: 0
	};

	_obj.event = _obj.e = {
		on: (name, func, once = false) => {
			func._id = _obj.events._index++;
			func._once = once ? once : false;
			if (_obj.events[name]) {
				_obj.events[name].push(func);
			} else {
				_obj.events[name] = [func];
			}
		},
		onOnce: (name, func) => {
			_obj.event.on(name, func, true);
		},
		emit: (name, data) => {
			if (_obj.events[name]) {
				for (let i = 0, n = _obj.events[name].length; i < n; i++) {
					_obj.events[name][i](data);
					if (_obj.events[name][i]._once) {
						_obj.events[name] = _obj.events[name].filter((evt) => evt._id != _obj.events[name][i]._id);
					}
				}
			}
			return false;
		},
		removeAll: (name) => {
			delete _obj.events[name];
		}
	};
};