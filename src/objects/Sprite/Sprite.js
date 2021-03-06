import Entity from "~/objects/Entity";
import Texture from "~/objects/Texture";
import Colour from "~/objects/Colour";
import getValue from "~/lib/getValue";
import Rectangle from "~/geometry/Rectangle";
import Point from "~/geometry/Point";

/**
 * @classdesc
 * Sprites are visible entities in your game world and are the most commonly used method of putting something on the screen in your game.
 *
 * Sprites have a position, a size, an anchor etc. and are filled with a given texture.
 *
 * Sprites will not appear on the screen or will not interact with the physics engine until they are added to an instance of a {@link Whirl.Stage|Stage}.
 *
 * @class Sprite
 * @memberof Whirl
 * @extends Whirl.Entity
 *
 * @param {Whirl.Game} game Game instance this sprite belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 * @param {Whirl.geometry.Rectangle} options.bounds Position and size of this sprite. Alternatively, give each value individually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect this sprite's `bounds` property in response.
 * @param {number} options.x=0 X-coordinate of this sprite.
 * @param {number} options.y=0 Y-coordinate of this sprite.
 * @param {number} options.w=50 Width of the rendered sprite.
 * @param {number} options.h=50 Height of the rendered sprite.
 * @param {Whirl.geometry.Point} options.anchor Initial anchor point that defines the origin point of this sprite's rendered position between `0` and `1`. Alternatively, give each anchor value individually with the `anchorX` and `anchorY` values.
 * @param {number} options.anchorX=0 X-coordinate of the anchor point (0-1).
 * @param {number} options.anchorY=0 Y-coordinate of this sprite's anchor point (0-1).
 *
 * @example
 * game.Sprite({
 * 	bounds: Whirl.geometry.Rectangle(200, 200, 50, 50)
 * });
 * // or
 * Whirl.Sprite(game, {
 * 	bounds: Whirl.geometry.Rectangle(200, 200, 50, 50)
 * });
 */
class Sprite extends Entity {
	/**
	 * Position and size of the sprite. The `x` and `y` properties define the coordinate position, the `w` and `h` properties define the rendered size.
	 *
	 * Note that Sprite bounds do not affect its physics body. You could even have the Sprite render at a completely different location to its physics body but still be moved when the body is moved from a different location.
	 *
	 * @memberof Whirl.Sprite#
	 * @type {Whirl.geometry.Rectangle}
	 * @default (0, 0, 50, 50)
	 */
	bounds;

	/**
	 * Anchor/Origin point of the rendered sprite position.
	 *
	 * Should be between `0` and `1` as a percentage through the bounds of the sprite where `(0, 0)` is the top-left-most point, and `(1, 1)` is the bottom-right-most point.
	 *
	 * @memberof Whirl.Sprite#
	 * @type {Whirl.geometry.Point}
	 * @default (0, 0)
	 */
	anchor;

	/**
	 * Texture used when rendering this Sprite to the screen.
	 *
	 * You should try to reduce the number of unique textures you create under a single game instance. Instead of creating a new texture for each sprite, instead consider using a single texture and passing it to the `fill` property of multiple sprites.
	 *
	 * {@link Whirl.Texture|See the Texture class page for more details.}
	 *
	 * @memberof Whirl.Sprite#
	 * @type {Whirl.Texture}
	 * @default {@link Whirl.Colour}(0, 0, 0)
	 */
	fill = null;

	constructor(game, options = {}) {
		super(game, options);

		if (options.bounds instanceof Rectangle.class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(
				getValue(options, "x", 0),
				getValue(options, "y", 0),
				getValue(options, "w", 50),
				getValue(options, "h", 50)
			);
		}

		if (options.anchor instanceof Point.class) {
			this.anchor = options.anchor;
		} else {
			this.anchor = Point(getValue(options, "anchorX", 0), getValue(options, "anchorY", 0));
		}

		this.setFill(options.fill);

		// Set initial state of `derived`
		this.derived.bounds = this.bounds.duplicate();
	}

	/**
	 * Set the texture to be used to render this Sprite to the screen.
	 *
	 * Defaults to a blank {@link Whirl.Colour|Colour texture}.
	 *
	 * @method Whirl.Sprite#setFill
	 *
	 * @param {Whirl.Texture} [fill] Texture to assign to this Sprite instance.
	 * @returns {this}
	 *
	 * @example
	 * sprite.setFill(
	 * 	Whirl.Colour(game, 200, 200, 150),
	 * );
	 */
	setFill(fill = new Colour(this.game, 0, 0, 0)) {
		if (!(fill instanceof Texture)) {
			this.game.debug.warn(
				"Invalid Texture instance given to Sprite#setFill. Using default texture instead.",
				"Whirl.Sprite"
			);

			this.fill = new Colour(this.game, 0, 0, 0);

			return this;
		}

		this.fill = fill;

		return this;
	}

	calculateDerived() {
		super.calculateDerived();

		this.derived.bounds.x =
			this.bounds.x - this.bounds.w * this.anchor.x * this.derived.scale + this.parent.derived.x;
		this.derived.bounds.y =
			this.bounds.y - this.bounds.h * this.anchor.y * this.derived.scale + this.parent.derived.y;
		this.derived.bounds.w = this.bounds.w * this.derived.scale;
		this.derived.bounds.h = this.bounds.h * this.derived.scale;

		return this;
	}
}

export default Sprite;
