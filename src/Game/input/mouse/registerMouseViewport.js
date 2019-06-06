// Whirl.input.mouse.registerMouseViewport

const eventRegisters = require("./eventRegisters");

// Register mouse event listeners on given viewport
function registerMouseViewport(target, events = []) {
	if (!target) {
		console.error("Whirl | No target element given when trying to register a mouse event element.");
		return false;
	}
	if (target._type !== "Whirl.Viewport" || !target.c) {
		console.error("Whirl | Target element must be a Whirl.Viewport with a valid canvas element.");
		return false;
	}
	const {c} = target;
	this.object.attachSystem(target, {event: true});

	for (event in events) {
		eventRegisters[events[event]](this, c, target);
	}

	return true;
}

module.exports = registerMouseViewport;
