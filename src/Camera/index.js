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

		- roundPixels
*/
function Camera(_game, presets = {}) {
	_game.object.init(this, "MobSin.camera", {tween: true});

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

	// The zoom of this camera - Scales the canvas context
	this.zoom = presets.zoom || 1;

	// Whether the position of this camera when rendering should be rounded to the nearest whole number when locked onto an object
	// For sprites with an image fill this can produce a more crisp result, but may offset the cameras position by half a pixel
	// Only affects the cameras rendered position, not its real position in the world
	this.roundPixels = presets.roundPixels || true;

	this._lockObject = null;
	this.lockTo = (_object) => {
		if (_object.bounds) {
			this._lockObject = _object;
			return true;
		}
		return false;
	};
	this.removeLock = () => {
		this._lockObject = null;
	};
	if (presets.lockTo) {
		this.lockTo(presets.lockTo);
	}

	/*
		TODO:
		The physical area that this camera can see in the game world
		used for render culling and exclusions to update
	*/
	this._worldView = new shapes.Rectangle();
	this._calculateWorldView = () => {};
	this._calculateWorldView();

	this._getScroll = () => {
		if (this._lockObject) {
			const mid = this._lockObject._physBounds.getMidpoint();
			this.scroll = {
				x: mid.x * this.zoom,
				y: mid.y * this.zoom
			};

			if (this.roundPixels) {
				this.scroll = {
					x: Math.round(this.scroll.x),
					y: Math.round(this.scroll.y)
				};
			}
		}
		return {
			x: -(this.scroll.x - (this.bounds.w * this.anchor.x)),
			y: -(this.scroll.y - (this.bounds.h * this.anchor.y))
		};
	};
}

module.exports = Camera;