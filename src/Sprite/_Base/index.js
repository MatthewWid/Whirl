// MobSin.Sprite._Base

/*
	A Sprite is a generic renderable "thing" in your game.
	Its fill can be set to either a colour or an image.
	This is the base Sprite that all types of Sprites inherit from.

	Presets can be:
	- outline
	- alpha
	- scale
	- z
*/
function _BaseSprite(_game, name, fill, presets = {}) {
	_game.object.init(this, "MobSin.Sprite", {tween: true});

	// The name of this Sprite
	this.name = name || "";

	this.fill = {
		type: "colour",
		data: "transparent"
	};
	// Sprites are filled with either a colour or an image
	this.setFill = (newFill) => {
		if (!newFill) {
			return this;
		}
		// If a string is given fill with a colour that is the given string.
		if (typeof newFill == "string" && newFill.length > 0) {
			this.fill = {
				type: "colour",
				data: newFill
			};
		// If an image asset is given will with that image.
		} else if (
			typeof newFill === "object" &&
			newFill._type === "MobSin.Asset" &&
			newFill.type === "image"
		) {
			this.fill = {
				type: "image",
				data: newFill
			};
		}

		return this;
	};
	this.setFill(fill);

	// A colour for an outline of your sprite
	this.outline = presets.outline || false;

	// The alpha for this sprite (0-1) that will fade it out on render
	this.alpha = presets.alpha || 1;

	// The scaling for this sprite - Used as a multiplier that increases/decreases the bounds
	// Eg, a 'width' of 50 and a 'scale' of 1 will be a 'width' of 50
	// However, with a 'scale' of 2 it will be a 'width' of 100
	this.scale = presets.scale || 1;

	// The z-axis for this sprite, allows for "layers" in your game world
	// Eg, a sprite with a 'z' of 5 will render after (And above) a sprite with a 'z' of 2
	this.z = presets.z || 0;

	// To be overridden by a subclass of Sprite
	this._update = () => {};
	this._render = () => {};
}

module.exports = _BaseSprite;
