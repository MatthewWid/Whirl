// MobSin.Camera

let shapes = require("../shapes");

/*
	A camera is the view into your world (stage)
	It grabs all objects and renders them onto your screen

	Presets can be:
	- scroll {x, y}
*/
function Camera(_game, x, y, w, h, presets = {}) {
	_game.object.init(this, "MobSin.camera");

	// The position and dimension on the screen that the camera will render to
	this.bounds = new shapes.Rectangle(x, y, w, h);

	// The scroll of the camera through the game world
	// Will offset objects' physical positions on the canvas depending on the scroll
	this.scroll = {
		x: (presets.scroll || {}).x || 0,
		y: (presets.scroll || {}).y || 0,
	};

	// The physical area that this camera can see in the game world
	// used forrender culling and exclusions to update
	this._physView = new shapes.Rectangle();

	// Filters, effects, following, culling, etc.
}

module.exports = Camera;