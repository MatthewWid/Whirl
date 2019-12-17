const Entity = require("../Entity/");
const Colour = require("../Colour/");
const getValue = require("../../lib/getValue.js");
const {Rectangle, Point} = require("../../shapes/");

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
 * @param {Whirl.shapes.Rectangle} options.bounds Position and size of this sprite. Alternatively, give each value individually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect this sprite's `bounds` property in response.
 * @param {number} options.x=0 X-coordinate of this sprite.
 * @param {number} options.y=0 Y-coordinate of this sprite.
 * @param {number} options.w=0 Width of the rendered sprite.
 * @param {number} options.h=0 Height of the rendered sprite.
 * @param {Whirl.shapes.Point} options.anchor Initial anchor point that defines the origin point of this sprite's rendered position between `0` and `1`. Alternatively, give each anchor value individually with the `anchorX` and `anchorY` values.
 * @param {number} options.anchorX=0 X-coordinate of this sprite's anchor point.
 * @param {number} options.anchorY=0 Y-coordinate of this sprite's anchor point.
 *
 * @example
 * game.Sprite({
 * 	bounds: Whirl.shapes.Rectangle(200, 200, 50, 50)
 * });
 * // or
 * Whirl.Sprite(game, {
 * 	bounds: Whirl.shapes.Rectangle(200, 200, 50, 50)
 * });
 */
class Sprite extends Entity {
	/**
	 * Position and size of the sprite. The `x` and `y` properties define the coordinate position, the `w` and `h` properties define the rendered size.
	 *
	 * Note that Sprite bounds do not affect its physics body. You could even have the Sprite render at a completely different location to its physics body but still be moved when the body is moved from a different location.
	 *
	 * @memberof Whirl.Sprite#
	 * @type {Whirl.shapes.Rectangle}
	 * @default (0, 0, 0, 0)
	 */
	bounds;

	/**
	 * Anchor/Origin point of the sprite's rendered position. This value should be between `0` and `1` as a percentage through the bounds of the sprite where `(0, 0)` is the top-left-most point, and `(1, 1)` is the bottom-right-most point.
	 *
	 * @memberof Whirl.Sprite#
	 * @type {Whirl.shapes.Point}
	 * @default (0, 0)
	 */
	anchor;

	/**
	 * Texture used when rendering this Sprite on the screen.
	 *
	 * @memberof Whirl.Sprite#
	 * @type {Whirl.Texture}
	 * @default {@link Whirl.Colour}
	 */
	fill = null;

	constructor(game, options = {}) {
		super(game, options);

		if (options.bounds instanceof Rectangle._class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(
				getValue(options, "x", 0),
				getValue(options, "y", 0),
				getValue(options, "w", 0),
				getValue(options, "h", 0)
			);
		}

		if (options.anchor instanceof Point._class) {
			this.anchor = options.anchor;
		} else {
			this.anchor = Point(getValue(options, "anchorX", 0), getValue(options, "anchorY", 0));
		}

		this.fill = options.fill || new Colour(game, 0, 0, 0);
	}
}

module.exports = Sprite;
