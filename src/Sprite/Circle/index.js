// MobSin.Sprite.Circle

let _BaseSprite = require("../_Base");
let render = require("./render");
let shapes = require("../../shapes");

// this.bounds = presets.shape.set({
// 	x: presets.x || 0,
// 	y: presets.y || 0,
// 	r: presets.r || 0
// });
// this._physBounds = shapes.Circle();

// this._physBounds.set({
// 	x: this.bounds.x,
// 	y: this.bounds.y,
// 	r: this.bounds.r * this.scale
// });

function Sprite_Circle(_game, name, fill, presets = {}) {
	_BaseSprite.bind(this)(_game, name, fill, presets); // Extend the _BaseSprite class

	this.bounds = shapes.Circle(
		presets.x || 0,
		presets.y || 0,
		presets.r || 0
	);

	// The physical bounds of the object taking into account the anchor point
	// _physBounds should be considered read-only outside of the _calculateRealBounds() method
	this._physBounds = shapes.Circle();
	this._calculatePhysBounds = () => {
		this._physBounds.set({
			x: this.bounds.x,
			y: this.bounds.y,
			r: this.bounds.r * this.scale
		});
	};
	this._calculatePhysBounds();

	// Render this sprite given a canvas context, offset coordinates and scaling
	this._render = (_ctx, modifiers = {}) => {
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

module.exports = (_game, name, fill, presets) => new Sprite_Circle(_game, name, fill, presets);