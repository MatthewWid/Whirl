// MobSin.Camera

let shapes = require("../shapes");

/*
	A camera is the view into your world (stage)
	It grabs all objects and renders them onto your screen

	Presets can be:

	(Position and dimensions of camera on the canvas)
		- x
		- y
		- w
		- h
	
	(Scroll of camera through the game world)
		- scroll {x, y}
*/
function Camera(_game, presets = {}) {
	_game.object.init(this, "MobSin.camera");

	// The position and dimension on the screen that the camera will render to
	this.bounds = new shapes.Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);

	// The scroll of the camera through the game world
	// Will offset objects' physical positions on the canvas depending on the scroll
	this.scroll = {
		x: (presets.scroll || {}).x || 0,
		y: (presets.scroll || {}).y || 0,
	};

	// The physical area that this camera can see in the game world
	// used for render culling and exclusions to update
	this._physView = new shapes.Rectangle();
	this._calculateWorldView = () => {};
	this._calculateWorldView();

	// Filters, effects, following, culling, etc.
}

module.exports = Camera;