const Texture = require("../Texture/");

/**
 * @classdesc
 * Represents a colour texture that is a solid colour defined by an RGB value.
 * 
 * @class Colour
 * @memberof Whirl
 * @extends Whirl.Texture
 * 
 * @param {number} r Red intensity of this colour from `0` to `255`.
 * @param {number} g Green intensity of this colour from `0` to `255`.
 * @param {number} b Green intensity of this colour from `0` to `255`.
 */
class Colour extends Texture {
	constructor(r, g, b) {
		super();
		
		this._data = `rgb(${r}, ${g}, ${b})`;
	}
}

module.exports = (...args) => new Colour(...args);
module.exports._class = Colour;
