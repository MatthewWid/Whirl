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
 * Textures can be reused and applied to multiple entities at a time. This is recommended as it saves system memory and reduces the amount of items in the global store. For example, instead of creating fifty sprites for enemies in your game that will each create their own textures, create a single standalone texture and pass it to each new instance of an enemy.
 *
 * This can also be useful when using *dynamic* textures, as the state of the single texture will be reflected across all entities that have it applied.
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
	 * Raw texture data that may be derived from the given input during instantiation.
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
