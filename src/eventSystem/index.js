// MobSin.eventSystem

module.exports = (_obj) => {
	_obj.events = {};

	_obj.event = _obj.e = {
		on: (name, func) => {
			if (_obj.events[name]) {
				func._id = _obj.events.length;
				_obj.events[name].push(func);
			} else {
				_obj.events[name] = [func];
			}
		},
		emit: (name, data) => {
			if (_obj.events[name]) {
				for (let i = 0, n = _obj.events[name].length; i < n; i++) {
					_obj.events[name][i](data);
				}
			}
			return false;
		},
		remove: (name) => {
			delete _obj.events[name];
		}
	};
};