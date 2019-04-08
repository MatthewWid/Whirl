// MobSin.input.mouse

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
		// pageX/Y - Top left of content - affected by scrolling
		// clientX/clientY - Top left of the content viewport
		// screenX/Y - Top left of physical monitor screen

		target.event.emit("mouseClick", {
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
	});

	return true;
}

const mouse = {
	registerMouseElement
};

module.exports = mouse;
