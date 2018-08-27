// MobSin.eventSystem

module.exports = (that) => {
	that.events = {};

	that.event = that.e = {
		on: (name, func) => {
			if (that.events[name]) {
				func._id = that.events.length;
				that.events[name].push(func);
			} else {
				that.events[name] = [func];
			}
		},
		emit: (name, data) => {
			if (that.events[name]) {
				for (let i = 0, n = that.events[name].length; i < n; i++) {
					that.events[name][i](data);
				}
			}
			return false;
		},
		remove: (name) => {
			delete that.events[name];
		}
	};
};