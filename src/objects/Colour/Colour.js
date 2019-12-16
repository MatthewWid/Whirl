const Texture = require("../Texture/");

/**
 * @classdesc
 * Represents a colour texture that is a solid colour defined by an RGB value.
 *
 * Colour textures should be instantiated using the `Whirl.Colour` factory method, but the underlying class can be accessed with `Whirl.Colour._class`.
 *
 * @class Colour
 * @memberof Whirl
 * @extends Whirl.Texture
 *
 * @param {number} r Red intensity of this colour from `0` to `255`.
 * @param {number} g Green intensity of this colour from `0` to `255`.
 * @param {number} b Green intensity of this colour from `0` to `255`.
 *
 * @example
 * const colour = Whirl.Colour(200, 50, 50);
 */
class Colour extends Texture {
	constructor(game, r, g, b) {
		super(game);

		this._data = `rgb(${r}, ${g}, ${b})`;
	}
}

module.exports = Colour;
