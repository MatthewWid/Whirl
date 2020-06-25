import Texture from "../Texture";

/**
 * @classdesc
 * Represents a solid colour defined by an RGB value.
 *
 * @class Colour
 * @memberof Whirl
 * @extends Whirl.Texture
 *
 * @param {Whirl.Game} game Game instance this texture belongs to and should be managed by.
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
	/**
	 * **Redness** of this colour (0-255).
	 *
	 * @name r
	 * @memberof Whirl.Colour#
	 * @type {number}
	 * @default 0
	 */
	_r;

	/**
	 * **Greenness** of this colour (0-255).
	 *
	 * @name g
	 * @memberof Whirl.Colour#
	 * @type {number}
	 * @default 0
	 */
	_g;

	/**
	 * **Blueness** of this colour (0-255).
	 *
	 * @name b
	 * @memberof Whirl.Colour#
	 * @type {number}
	 * @default 0
	 */
	_b;

	constructor(game, r, g, b) {
		super(game);

		this._r = r || 0;
		this._g = g || 0;
		this._b = b || 0;

		this.calculateData();
	}

	get r() {
		return this._r;
	}

	set r(r) {
		this._r = r;

		this.calculateData();
	}

	get g() {
		return this._g;
	}

	set g(g) {
		this._g = g;

		this.calculateData();
	}

	get b() {
		return this._b;
	}

	set b(b) {
		this._b = b;

		this.calculateData();
	}

	calculateData() {
		this._data = `rgb(${this._r}, ${this._g}, ${this._b})`;
	}
}

export default Colour;
