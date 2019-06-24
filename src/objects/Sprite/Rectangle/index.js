// Whirl.Sprite.Rectangle

const _BaseSprite = require("../_Base");
const update = require("./update");
const render = require("./render");
const anchor = require("../../../lib/anchor.js");
const shapes = require("../../../shapes");
const resizeToImage = require("./resizeToImage.js");

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

	this.resizeToImage = resizeToImage.bind(this);
	if (!presets.hasOwnProperty("resizeToImage") || presets.resizeToImage) {
		this.resizeToImage();
	}

	// The physical bounds of the object taking into account the anchor point
	// _screenBounds should be considered read-only outside of the _update() method
	this._screenBounds = shapes.Rectangle();

	this._update = (...args) => {update.call(this, ...args)};

	this._render = (...args) => {render.call(this, ...args)};
}

module.exports = (...args) => new Sprite_Rectangle(...args);
