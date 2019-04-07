// MobSin.input.mouse

function registerMouseElement(target) {
	if (!target) {
		console.error("MobSin | No target element given when trying to register a mouse event element.");
		return false;
	}
	if (target._type !== "MobSin.Viewport" || !target.c) {
		console.error("MobSin | Target element must be a MobSin.Viewport with a valid canvas element.");
	}
	const {c} = target;
	this.object.attachSystem(target, {event: true});

	c.addEventListener("click", (e) => {
		target.event.emit("mouseClick", {
			rawEvent: e
		});
	});

	return true;
}

const mouse = {
	registerMouseElement
};

module.exports = mouse;
