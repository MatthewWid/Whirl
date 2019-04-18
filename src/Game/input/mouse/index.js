// Whirl.input.mouse

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
	"mouseClick": (c, vp) => {
		c.addEventListener("click", (evt) => {
			evt.preventDefault();
			const evtInfo = formatMousePos(evt, c);

			vp.event.emit("mouseClick", {
				...evtInfo
			});
		});
	},
	"mouseMove": (c, vp) => {
		let posLast = {
			x: 0,
			y: 0
		};

		c.addEventListener("mousemove", (evt) => {
			evt.preventDefault();
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
		eventRegisters[events[event]](c, target);
	}

	return true;
}

const mouse = {
	registerMouseViewport
};

module.exports = mouse;
