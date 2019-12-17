const Base = require("../Base/");
const {Rectangle} = require("../../shapes");

/**
 * @classdesc
 * Abstract class that all game textures must inherit from.
 *
 * Textures are an applied image, colour, spritesheet, etc. that are used by other game objects to actually render something onto the screen.
 *
 * Texture data is immutable and should be treated as so. If you wish to change a texture you should instead create a new Texture and destroy the previous one.
 *
 * @class Texture
 * @memberof Whirl
 * @abstract
 *
 * @example
 * class MyTexture extends Whirl.Texture {}
 */
class Texture extends Base {
	/**
	 * Raw texture data of this texture.
	 *
	 * @memberof Whirl.Texture#
	 * @type {any}
	 * @readonly
	 */
	_data;

	/**
	 * Get the raw texture data of this Texture.
	 *
	 * @method Whirl.Texture#get
	 * @returns {any}
	 */
	get() {
		return this._data;
	}
}

module.exports = Texture;
