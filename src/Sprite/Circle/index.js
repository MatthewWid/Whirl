// Whirl.Sprite.Circle

const _BaseSprite = require("../_Base");
const update = require("./update");
const render = require("./render");
const shapes = require("../../shapes");

/*
	A circle Sprite.
	Its boundaries are defined by its X, Y and radius.

	Presets can be:
	- r
*/
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

	this._update = (...args) => {update.call(this, ...args)};

	this._render = (...args) => {render.call(this, ...args)};
}

module.exports = (...args) => new Sprite_Circle(...args);
