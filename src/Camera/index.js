// MobSin.Camera

let shapes = require("../shapes");

/*
	A camera is the view into your world (stage)
	It grabs all objects and renders them onto your screen

	Presets can be:

	Position and dimensions of camera on the canvas
		- x
		- y
		- w
		- h

	Anchor of the scrolling
		- anchor {x, y}
	
	Scroll of camera through the game world
		- scroll {x, y}

	Zoom of camera in the game world
		- zoom
*/
function Camera(_game, presets = {}) {
	_game.object.init(this, "MobSin.camera");

	this.anchor = {
		x: (presets.anchor || {}).x || 0,
		y: (presets.anchor || {}).y || 0
	};
	// The position and dimension on the screen that the camera will render to
	this.bounds = new shapes.Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);

	// The scroll of the camera through the game world
	// Will offset objects' physical positions on the canvas depending on the scroll
	if (presets.scroll) {
		this.scroll = {
			x: presets.scroll.x || 0,
			y: presets.scroll.y || 0,
		};
	} else {
		this.scroll = {
			x: 0,
			y: 0
		};
	}

	this.zoom = presets.zoom || 1;

	this._lockObject = null;
	// this.lockTo = (_object) => {
	// 	if (_object.bounds) {
	// 		this.anchor = {
	// 			x: .5,
	// 			y: .5
	// 		};
	// 		this._lockObject = _object;
	// 		return true;
	// 	}
	// 	return false;
	// };
	// this.removeLock = () => {
	// 	this._lockObject = null;
	// };
	// if (presets.lockTo) {
	// 	this.lockTo(presets.lockTo);
	// }

	// The physical area that this camera can see in the game world
	// used for render culling and exclusions to update
	this._worldView = new shapes.Rectangle();
	this._calculateWorldView = () => {};
	this._calculateWorldView();

	this._getScroll = () => {
		if (this._lockObject) {
			// const mid = {
			// 	x: this._lockObject._physBounds.x + this._lockObject._physBounds.w / 2,
			// 	y: this._lockObject._physBounds.y + this._lockObject._physBounds.h / 2
			// };
			// return {
			// 	x: 0,
			// 	y: 0
			// };
		} else {
			return {
				x: -(this.scroll.x - (this.bounds.w * this.anchor.x)),
				y: -(this.scroll.y - (this.bounds.h * this.anchor.y))
			};
		}
	};

	// Filters, effects, following, culling, etc.
}

module.exports = Camera;