// Whirl.Sprite.Rectangle

const _BaseSprite = require("../_Base");
const render = require("./render");
const shapes = require("../../shapes");
const anchor = require("../../lib/anchor.js");

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

	this.anchor = anchor(this, presets.anchor);

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
		if (this._fill.type === "image") {
			this.bounds.set({
				w: this._fill.data.rawData.width * scale,
				h: this._fill.data.rawData.height * scale
			});
		}

		return this;
	};
	if (!presets.hasOwnProperty("resizeToImage") || presets.resizeToImage) {
		this.resizeToImage();
	}

	// The physical bounds of the object taking into account the anchor point
	// _screenBounds should be considered read-only outside of the _update() method
	this._screenBounds = shapes.Rectangle();
	this._update = (offset = {}) => {
		this._screenBounds.set({
			x: Math.round(this.bounds.x - this.bounds.w * this.anchor.x * this.scale) + (offset.x || 0),
			y: Math.round(this.bounds.y - this.bounds.h * this.anchor.y * this.scale) + (offset.y || 0),
			w: this.bounds.w * this.scale,
			h: this.bounds.h * this.scale
		});
	};

	// Render this sprite given a canvas context, offset coordinates and scaling
	this._render = (_ctx, offset = {}) => {
		_ctx.save();

		if (this.alpha != 0 && this.scale != 0 || (this._fill.type == "colour" && this._fill.data != "transparent")) { // Don't render if we won't see it anyway
			if (this.alpha != 1) {
				_ctx.globalAlpha = this.alpha;
			}

			render[this._fill.type](_ctx, this);
		}

		if (this.outline) {
			_ctx.globalAlpha = 1;

			_ctx.lineWidth = 2;
			_ctx.strokeStyle = this.outline;
			_ctx.strokeRect(this._screenBounds.x - 1, this._screenBounds.y - 1, this._screenBounds.w + 2, this._screenBounds.h + 2);
		}

		_ctx.restore();
	};
}

module.exports = (...args) => new Sprite_Rectangle(...args);
