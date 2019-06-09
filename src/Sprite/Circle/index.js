// Whirl.Sprite.Circle

const _BaseSprite = require("../_Base");
const render = require("./render");
const shapes = require("../../shapes");

function Sprite_Circle(_game, name, fill, presets = {}) {
	_BaseSprite.bind(this)(_game, name, fill, presets); // Extend the _BaseSprite class

	this.bounds = shapes.Circle(
		presets.x || 0,
		presets.y || 0,
		presets.r || 0
	);

	// The physical bounds of the object taking into account the anchor point
	// _screenBounds should be considered read-only outside of the _update() method
	this._screenBounds = shapes.Circle();
	this._update = (offset = {}) => {
		this._screenBounds.set({
			x: this.bounds.x + (offset.x || 0),
			y: this.bounds.y + (offset.y || 0),
			r: this.bounds.r * this.scale
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

		_ctx.restore();
	};
}

module.exports = (...args) => new Sprite_Circle(...args);
