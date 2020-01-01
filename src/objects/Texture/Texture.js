const Base = require("../Base/");
const {Rectangle} = require("../../geometry/");

/**
 * @classdesc
 * Textures represent an image, colour, spritesheet, etc. that are used by other game objects to render something onto the screen.
 *
 * Textures can be reused and applied to multiple entities at a time. This is recommended as it saves system memory and reduces the amount of items in the global store. For example, instead of creating fifty sprites for enemies in your game that will each create new Texture instances, create a single Texture instance and pass it to each new instance of an sprite.
 *
 * This can also be useful when using *dynamic* textures, as changing the state of the texture will have its effects be reflected across all entities that have it applied.
 *
 * Note that Textures cannot have transparency. If you wish to add transparency or partially fade out a texture then you should modify the {@link Whirl.Entity#alpha|Entity `alpha` property}.
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
	 * @ignore
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
