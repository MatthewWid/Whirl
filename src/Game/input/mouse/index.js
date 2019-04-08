// MobSin.input.mouse

const formatMousePos = (e, c) => ({
	rawEvent: e,
	pos: {
		// TODO: Include viewport and camera offsets in calculation
		x: e.pageX - c.offsetLeft,
		y: e.pageY - c.offsetTop
	},
	page: {
		x: e.pageX,
		y: e.pageY
	}
});

function registerMouseElement(target) {
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

	c.addEventListener("click", (e) => {
		const evtInfo = formatMousePos(e, c);
		
		target.event.emit("mouseClick", {
			...evtInfo
		});
	});

	return true;
}

const mouse = {
	registerMouseElement
};

module.exports = mouse;
