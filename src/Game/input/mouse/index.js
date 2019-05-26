// Whirl.input.mouse

const attemptPreventDefault = require("../../../lib/attemptPreventDefault.js");

const formatMousePos = (evt, c) => ({
	// Raw MouseEvent object
	rawEvent: evt,
	// Position relative to the viewport/world
	pos: {
		// TODO: Include viewport and camera offsets in calculation
		x: evt.pageX - c.offsetLeft,
		y: evt.pageY - c.offsetTop
	},
	// Position relative to the origin of the page
	page: {
		x: evt.pageX,
		y: evt.pageY
	}
});

const eventRegisters = {
	mouseClick: (_game, c, vp) => {
		c.addEventListener("click", (evt) => {
			attemptPreventDefault(_game, evt);
			const evtInfo = formatMousePos(evt, c);

			vp.event.emit("mouseClick", {
				...evtInfo
			});
		});
	},
	mouseMove: (_game, c, vp) => {
		let posLast = {
			x: 0,
			y: 0
		};

		c.addEventListener("mousemove", (evt) => {
			attemptPreventDefault(_game, evt);
			const evtInfo = formatMousePos(evt, c);

			vp.event.emit("mouseMove", {
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

function setupViewportStandard(_game, viewport) {
	_game.input.registerMouseViewport(viewport, ["mouseClick", ["mouseMove"]]);
}

function setup() {
	this.viewportManager.getAll().forEach((e) => {
		setupViewportStandard(this, e);
	});

	this.event.on("requestMouseEvents", (e) => {
		if (e.object._type === "Whirl.Viewport" && this.config.input) {
			setupViewportStandard(this, e.object);
		}
	});
}

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
	registerMouseViewport
};

module.exports = mouse;
