// MobSin.input.mouse

function registerMouseElement(target) {
	if (!target) {
		console.error("MobSin | No target element given when trying to register a mouse event element.");
		return false;
	}
	console.log(target, target._type !== "MobSin.Viewport", !target.c);
	if (target._type !== "MobSin.Viewport" || !target.c) {
		console.error("MobSin | Target element must be a MobSin.Viewport with a valid canvas element.");
	}

	return true;
}

const mouse = {
	registerMouseElement
};

module.exports = mouse;
