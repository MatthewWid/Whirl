// Whirl.input.mouse

const eventRegisters = require("./eventRegisters");

// Set the base element that mouse events will be listened on (Default: <body>)
// Listens with all mouse events
function setMouseElement(targetEl = document.body) {
	this.input._mouseElement = targetEl;
	Object.keys(eventRegisters).forEach((register) => {
		eventRegisters[register](this, targetEl, this.input);
	});

	return this;
}

// Abstraction: Set up "mouseClick" and "mouseMove" event listeners on given viewport
function setupViewportStandard(_game, viewport) {
	_game.input.registerMouseViewport(viewport, ["mouseClick", "mouseMove"]);
}

function setup() {
	// Set up mouse event listeners on all viewports
	this.viewportManager.getAll().forEach((e) => {
		setupViewportStandard(this, e);
	});

	// Listen for other viewports being created later and attach mouse events to them
	this.event.on("requestMouseEvents", (e) => {
		if (e.object._type === "Whirl.Viewport" && this.config.input) {
			setupViewportStandard(this, e.object);
		}
	});
}

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

const mouse = {
	setup,
	setMouseElement,
	registerMouseViewport
};

module.exports = mouse;
