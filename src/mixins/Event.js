const Mixin = require("./Mixin.js");

class Event extends Mixin {
	static _namespace = "event";
	
	_events = [];
	_index = 0;
}

module.exports = Event;
