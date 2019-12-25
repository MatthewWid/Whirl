const Texture = require("../Texture/");

/**
 * @classdesc
 * Represents a solid colour defined by an RGB value.
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
 * game.Colour(200, 50, 50);
 * // or
 * Whirl.Colour(game, 200, 50, 50);
 */
class Colour extends Texture {
	constructor(game, r, g, b) {
		super(game);

		this._data = `rgb(${r}, ${g}, ${b})`;
	}
}

module.exports = Colour;
