// MobSin.Sprite

let shapes = require("../shapes");
let math = require("../math");

/*
	A sprite is a generic renderable *thing* in your game.
	Its fill can be set to either a colour or an image.

	Presets can be:
	- x
	- y
	- anchor {x, y}
	- alpha
*/
function Sprite(_game, name, fill, presets = {}) {
	_game.object.init(this, "MobSin.sprite");

	this.name = name;

	this.setFill = (newFill) => {
		if (typeof newFill == "string") {
			this.fill = {
				type: "colour",
				data: newFill
			};
		} else if (
			typeof newFill == "object" &&
			newFill._type == "MobSin.asset" &&
			newFill.type == "image"
		) {
			this.fill = {
				type: "image",
				data: newFill
			};
		} else {
			this.fill = {
				type: "colour",
				data: "transparent"
			};
		}
	};
	this.setFill(fill);

	this.alpha = presets.alpha || 1;

	// The anchor point for where this sprite's X and Y are based off of
	this.anchor = {
		x: (presets.anchor || {}).x || 0,
		y: (presets.anchor || {}).y || 0
	};
	// The coords and dimensions the sprite will draw to, does not include physics
	this.bounds = new shapes.Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || (this.fill.type === "image" ? this.fill.data.rawData.width : false) || 0,
		presets.h || (this.fill.type === "image" ? this.fill.data.rawData.width : false) || 0
	);

	// The physical bounds of the object taking into account the anchor point
	this._physBounds = new shapes.Rectangle();
	this._calculateRealBounds = () => {
		this._physBounds.x = this.bounds.x - this.bounds.w * this.anchor.x;
		this._physBounds.y = this.bounds.y - this.bounds.y * this.anchor.y;
		this._physBounds.w = this.bounds.w;
		this._physBounds.h = this.bounds.h;
	};
	this._calculateRealBounds();

	// Render this sprite given a canvas context, offset coordinates and scaling
	this._render = (_ctx, modifiers = {}) => { // Take offsets
		_ctx.save();

		if (this.alpha != 0) {
			if (this.alpha != 1) {
				_ctx.globalAlpha = this.alpha;
			}

			if (this.fill.type === "colour") {
				if (this.bounds.shape === "rectangle") {
					_ctx.fillStyle = this.fill.data;
					_ctx.fillRect(this._physBounds.x, this._physBounds.y, this._physBounds.w, this._physBounds.h);
				}
			}

			if (this.fill.type === "image") {
				_ctx.drawImage(this.fill.data.rawData, this._physBounds.x, this._physBounds.y, this._physBounds.w, this._physBounds.h);
			}
		}

		_ctx.restore();
	};
}

module.exports = Sprite;