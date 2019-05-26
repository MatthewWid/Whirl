// Whirl.Camera

let shapes = require("../shapes");

function Camera(_game, presets = {}) {
	_game.object.init(this, "Whirl.Camera", {tween: true});

	this.anchor = {
		x: (presets.anchor || {}).x || 0,
		y: (presets.anchor || {}).y || 0,
		center: () => {
			this.anchor.x = this.anchor.y = .5;

			return this;
		}
	};
	// The position and dimension on the screen that the camera will render to
	this.bounds = shapes.Rectangle(
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
	this.roundPixels = presets.hasOwnProperty("roundPixels") ? presets.roundPixels : true;

	this._lerp = 1;
	this.setLerp = (lerp = this._lerp) => {
		this._lerp = lerp;
	};

	this._followObject = null;
	this.follow = (_object, lerp) => {
		if (_object._type === "Whirl.Sprite") {
			this._followObject = _object;
			this.anchor.center();
			this.setLerp(lerp);
		} else {
			console.warn("Whirl | Cannot lock camera to a non-Sprite object.");
		}

		return this;
	};
	this.unfollow = () => {
		this._followObject = null;
	};

	this.centerOn = (_object) => {
		if (_object._type === "Whirl.Sprite") {
			const mid = _object._physBounds.getMidpoint();
			
			this.anchor.center();
			this.scroll = {
				x: (mid.x * this.zoom),
				y: (mid.y * this.zoom)
			};
		}

		return this;
	};

	/*
		TODO:
		The physical area that this camera can see in the game world
		used for render culling and exclusions to update
	*/
	this._worldView = shapes.Rectangle();
	this._calculateWorldView = () => {};
	this._calculateWorldView();

	this._getScroll = () => {
		if (this._followObject) {
			const mid = this._followObject._physBounds.getMidpoint();
			this.scroll = {
				x: (mid.x * this.zoom - this.scroll.x) * this._lerp + this.scroll.x,
				y: (mid.y * this.zoom - this.scroll.y) * this._lerp + this.scroll.y,
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

module.exports = (...args) => new Camera(...args);
