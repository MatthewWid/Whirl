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

	this.anchor = {
		x: (presets.anchor || {}).x || 0,
		y: (presets.anchor || {}).y || 0
	};
	this.bounds = new shapes.Rectangle(
		presets.x,
		presets.y,
		presets.w,
		presets.h
	);

	this._realBounds = new shapes.Rectangle(
		this.bounds.x - this.bounds.w * this.anchor.x,
		this.bounds.y - this.bounds.y * this.anchor.y,
		this.bounds.w,
		this.bounds.h
	);
}

module.exports = Sprite;