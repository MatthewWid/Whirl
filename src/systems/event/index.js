// MobSin.systems.event

module.exports = (_game, _obj) => {
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

			return _obj;
		},
		onOnce: (name, func) => {
			_obj.event.on(name, func, true);

			return _obj;
		},
		emit: (name, data = {}) => {
			if (_obj.events[name]) {
				for (let i = 0; i < _obj.events[name].length; i++) {
					_obj.events[name][i](data);
					if (_obj.events[name][i]._once) {
						_obj.events[name] = _obj.events[name].filter((evt) => evt._id != _obj.events[name][i]._id);
						if (_obj.events[name].length == 0) { // If there are no more listeners
							delete _obj.events[name]; // Delete the event listeners property
							break; // Stop looping over event listener properties
						}
					}
				}
				return true;
			}
			return false;
		},
		// Remove all event listeners of the given name
		removeAll: (name) => {
			delete _obj.events[name];
		}
	};
};