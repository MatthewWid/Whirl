// MobSin.input.mouse

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

function registerMouseViewport(target) {
	if (!target) {
		console.error("MobSin | No target element given when trying to register a mouse event element.");
		return false;
	}
	if (target._type !== "MobSin.Viewport" || !target.c) {
		console.error("MobSin | Target element must be a MobSin.Viewport with a valid canvas element.");
		return false;
	}
	const {c} = target;
	this.object.attachSystem(target, {event: true});
	let posLast = {
		x: 0,
		y: 0
	};

	c.addEventListener("click", (evt) => {
		evt.preventDefault();
		const evtInfo = formatMousePos(evt, c);

		target.event.emit("mouseClick", {
			...evtInfo
		});
	});
	c.addEventListener("mousemove", (evt) => {
		evt.preventDefault();
		const evtInfo = formatMousePos(evt, c);

		target.event.emit("mouseMove", {
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

	return true;
}

const mouse = {
	registerMouseViewport
};

module.exports = mouse;
