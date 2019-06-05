// Whirl.input.mouse

const attemptPreventDefault = require("../../../lib/attemptPreventDefault.js");

// Format raw mouse event data
const formatMouseEvt = (evt, element) => ({
	baseElement: element,
	clickedElement: evt.target,
	// Raw MouseEvent object
	rawEvent: evt,
	// Position relative to the viewport/world
	pos: {
		// TODO: Include viewport and camera offsets in calculation
		x: evt.pageX - element.offsetLeft,
		y: evt.pageY - element.offsetTop
	},
	// Position relative to the origin of the page
	page: {
		x: evt.pageX,
		y: evt.pageY
	}
});

// Register specific events with the given viewports
const eventRegisters = {
	mouseClick: (_game, element, emitter) => {
		element.addEventListener("click", (evt) => {
			attemptPreventDefault(_game, evt);
			const evtInfo = formatMouseEvt(evt, element);

			emitter.event.emit("mouseClick", {
				...evtInfo
			});
		});
	},
	mouseMove: (_game, element, emitter) => {
		let posLast = {
			x: 0,
			y: 0
		};

		element.addEventListener("mousemove", (evt) => {
			attemptPreventDefault(_game, evt);
			const evtInfo = formatMouseEvt(evt, element);

			emitter.event.emit("mouseMove", {
				...evtInfo,
				posLast: {
					...posLast
				},
				posDiff: {
					x: evtInfo.pos.x - posLast.x,
					y: evtInfo.pos.y - posLast.y
				}
			});
			posLast = {
				...evtInfo.pos
			};
		});
	}
};

// Set the base element that mouse events will be listened on (Default: <body>)
// Listens with all mouse events
function setMouseElement(targetEl = document.body) {
	this.input._mouseElement = targetEl;
	Object.keys(eventRegisters).forEach((register) => {
		eventRegisters[register](this, targetEl, this.input);
	});
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
