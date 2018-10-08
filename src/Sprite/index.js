// MobSin.Sprite

let render = require("./render");
let shapes = require("../shapes");
let math = require("../math");

/*
	A sprite is a generic renderable *thing* in your game.
	Its fill can be set to either a colour or an image.

	Presets can be:
	- x
	- y
	- w
	- h
	- outline
	- alpha
	- scale
	- z
	- anchor {x, y}
*/
function Sprite(_game, name, fill, presets = {}) {
	_game.object.init(this, "MobSin.Sprite", {tween: true});

	this.name = name || "";

	this.setFill = (newFill) => {
		// If a string is given fill with a colour that is the given string.
		if (typeof newFill == "string" && newFill.length > 0) {
			this.fill = {
				type: "colour",
				data: newFill
			};
		// If an image asset is given will with that image.
		} else if (
			typeof newFill == "object" &&
			newFill._type == "MobSin.asset" &&
			newFill.type == "image"
		) {
			this.fill = {
				type: "image",
				data: newFill
			};
		// Otherwise, default to filling with a transparent colour
		} else {
			this.fill = {
				type: "colour",
				data: "transparent"
			};
		}
	};
	this.setFill(fill);

	// A colour for an outline of your sprite
	this.outline = presets.outline || null;

	// The alpha for this sprite (0-1) that will fade it on render
	this.alpha = presets.alpha || 1;

	// The scaling for this sprite - Used a multiplier that increases/decreases the bounds
	// Eg, a 'width' of 50 and a 'scale' of 1 will be a 'width' of 50
	// However, with a 'scale' of 2 it will be a 'width' of 100
	this.scale = presets.scale || 1;

	// The z-axis for this sprite, allows for "layers" in your game world
	// Eg, a sprite with a 'z' of 5 will render after (And above) a sprite with a 'z' of 2
	this.z = presets.z || 0;

	// The anchor point for where this sprite's X and Y are based off of
	this.anchor = {
		x: (presets.anchor || {}).x || 0,
		y: (presets.anchor || {}).y || 0,
		center: () => {
			this.anchor.x = this.anchor.y = .5;

			return this;
		}
	};

	// The coords and dimensions the sprite will draw to, does not include physics
	presets.shape = presets.shape || shapes.Rectangle();
	switch (presets.shape._shape) {
		case "rectangle":
			this.bounds = shapes.Rectangle(
				presets.x || 0,
				presets.y || 0,
				presets.w || (this.fill.type === "image" ? this.fill.data.rawData.width : false) || 0,
				presets.h || (this.fill.type === "image" ? this.fill.data.rawData.height : false) || 0
			);
			this._physBounds = shapes.Rectangle();
			break;
		case "circle":
			this.bounds = presets.shape.set({
				x: presets.x || 0,
				y: presets.y || 0,
				r: presets.r || 0
			});
			this._physBounds = shapes.Circle();
			break;
	}
	

	// The physical bounds of the object taking into account the anchor point
	// _physBounds should be considered read-only outside of the _calculateRealBounds() method
	this._calculatePhysBounds = () => {
		switch (this.bounds._shape) {
			case "rectangle":
				this._physBounds.set({
					w: this.bounds.w * this.scale,
					h: this.bounds.h * this.scale,
					x: Math.round(this.bounds.x - this.bounds.w * this.anchor.x * this.scale),
					y: Math.round(this.bounds.y - this.bounds.h * this.anchor.y * this.scale)
				});
				break;
			case "circle":
				this._physBounds.set({
					x: this.bounds.x,
					y: this.bounds.y,
					r: this.bounds.r * this.scale
				});
				break;
		}
	};
	this._calculatePhysBounds();

	// Render this sprite given a canvas context, offset coordinates and scaling
	this._render = (_ctx, modifiers = {}) => { // Take offsets
		_ctx.save();

		if (this.alpha != 0 && this.scale != 0 || (this.fill.type == "colour" && this.fill.data != "transparent")) { // Don't render if we won't see it anyway
			if (this.alpha != 1) {
				_ctx.globalAlpha = this.alpha;
			}

			render[this.fill.type](_ctx, this);
		}

		if (this.outline && this.bounds._shape === "rectangle") {
			_ctx.globalAlpha = 1;

			_ctx.lineWidth = 2;
			_ctx.strokeStyle = this.outline;
			_ctx.strokeRect(this._physBounds.x - 1, this._physBounds.y - 1, this._physBounds.w + 2, this._physBounds.h + 2);
		}

		_ctx.restore();
	};
}

module.exports = (_game, name, fill, presets) => new Sprite(_game, name, fill, presets);