// MobSin.Sprite.Rectangle

let _BaseSprite = require("../_Base");
let render = require("./render");
let shapes = require("../../shapes");

/*
	A rectangle Sprite.
	Its boundaries are defined by its X, Y, width and height.

	Presets can be:
	- w
	- h
	- anchor {x, y}
*/
function Sprite_Rectangle(_game, name, fill, presets = {}) {
	_BaseSprite.bind(this)(_game, name, fill, presets); // Extend the _BaseSprite class

	// The anchor point for where this sprite's X and Y are based off of
	this.anchor = {
		x: (presets.anchor || {}).x || 0,
		y: (presets.anchor || {}).y || 0,
		center: () => {
			this.anchor.x = this.anchor.y = .5;

			return this;
		}
	};

	// The boundaries that this Sprite is contained in
	this.bounds = shapes.Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);

	// Resize this Sprite's boundaries to the same dimensions as its fill image
	// Optionally modify the resize by a given scale factor but maintain aspect ratio
	this.resizeToImage = (scale = 1) => {
		if (this.fill.type === "image") {
			this.bounds.set({
				w: this.fill.data.rawData.width * scale,
				h: this.fill.data.rawData.height * scale
			});
		}

		return this;
	};
	this.resizeToImage();

	// The physical bounds of the object taking into account the anchor point
	// _physBounds should be considered read-only outside of the _update() method
	this._physBounds = shapes.Rectangle();
	this._update = () => {
		this._physBounds.set({
			w: this.bounds.w * this.scale,
			h: this.bounds.h * this.scale,
			x: Math.round(this.bounds.x - this.bounds.w * this.anchor.x * this.scale),
			y: Math.round(this.bounds.y - this.bounds.h * this.anchor.y * this.scale)
		});
	};
	this._update();

	// Render this sprite given a canvas context, offset coordinates and scaling
	this._render = (_ctx, offset = {}) => {
		_ctx.save();

		if (this.alpha != 0 && this.scale != 0 || (this.fill.type == "colour" && this.fill.data != "transparent")) { // Don't render if we won't see it anyway
			if (this.alpha != 1) {
				_ctx.globalAlpha = this.alpha;
			}

			render[this.fill.type](_ctx, this);
		}

		if (this.outline) {
			_ctx.globalAlpha = 1;

			_ctx.lineWidth = 2;
			_ctx.strokeStyle = this.outline;
			_ctx.strokeRect(this._physBounds.x - 1, this._physBounds.y - 1, this._physBounds.w + 2, this._physBounds.h + 2);
		}

		_ctx.restore();
	};
}

module.exports = (...args) => new Sprite_Rectangle(...args);