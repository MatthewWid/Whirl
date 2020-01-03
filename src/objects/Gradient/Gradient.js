const Texture = require("../Texture/");
const {Point} = require("../../geometry/");
const Colour = require("../Colour/");

/**
 * @classdesc
 * Represents a colour gradient that transitions between two or more {@link Whirl.Colour|colours} in a given space.
 *
 * Gradients are defined by a starting point to an ending point as a percentage of the current parent that is rendering it, as well as a list of colour stops. For example, if two {@link Whirl.Sprite|Sprite} objects of different sizes use the same Gradient instance, the start and end points and its colour stops will scale differently depending on the Sprite.
 *
 * @class Gradient
 * @memberof Whirl
 * @extends Whirl.Texture
 *
 * @param {Whirl.Game} game Game instance this texture belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 * @param {Whirl.Point} options.start Start point as a percentage of the parent.
 * @param {Whirl.Point} options.end End point as a percentage of the parent.
 * @param {Whirl.Gradient~ColourStop[]} options.stops Array of colour stop tuples that represent each colour in the gradient from start to end.
 *
 * @example
 * game.Gradient({});
 * // or
 * Whirl.Gradient(game, {});
 *
 * @example
 * const {geometry: {Point}} = Whirl;
 * ...
 * const {Sprite, Gradient, Colour} = game;
 *
 * // Gradient from top-left to bottom-right from black to blue to green.
 * Sprite({
 * 	fill: Gradient({
 * 		start: Point(0, 0),
 * 		end: Point(100, 100),
 * 		stops: [
 * 			[0, Colour(0, 0, 0)],
 * 			[0.5, Colour(0, 0, 255)],
 * 			[1, Colour(0, 255, 0)],
 * 		],
 * 	}),
 * });
 */
class Gradient extends Texture {
	/**
	 * Start point of this gradient as a percentage of its parent object.
	 *
	 * For example, `Point(0, 0)` will begin the gradient at the top-left of the parent.
	 *
	 * @memberof Whirl.Gradient#
	 * @type {Whirl.geometry.Point}
	 * @default (50, 0)
	 */
	start;

	/**
	 * End point of this gradient as a percentage of its parent object.
	 *
	 * For example, `Point(100, 100)` will end the gradient at the bottom-right of the parent.
	 *
	 * @memberof Whirl.Gradient#
	 * @type {Whirl.geometry.Point}
	 * @default (50, 100)
	 */
	end;

	/**
	 * Individual gradient stop defined by an `offset` and `Colour`.
	 *
	 * The first element (the offset) is a number between `0` and `1` (interpolated between the start and end of the gradient {@link Whirl.Gradient#start|start} and {@link Whirl.Gradient#end|end} points).
	 *
	 * The second element is the colour of the stop defined by a {@link Whirl.Colour} object.
	 *
	 * @typedef {Array} Whirl.Gradient~ColourStop
	 *
	 * @example
	 * ...
	 *
	 * stops: [
	 * 	[0, game.Colour(0, 0, 0)],
	 * 	[.5, game.Colour(0, 255, 0)],
	 * 	[1, Colour(0, 0, 0),
	 * ]
	 *
	 * ...
	 */

	/**
	 * Array of colour stop tuples that make up the colours of the gradient.
	 *
	 * Note that every tuple (sub-array) must have its first element be the `offset` and its second be the `Colour`, otherwise the list is invalid and will be set to an empty array (`[]`).
	 *
	 * @name stops
	 * @memberof Whirl.Gradient#
	 * @type {Whirl.Gradient~ColourStop[]}
	 * @default []
	 */
	_stops;

	constructor(game, options = {}) {
		super(game);

		if (options.start instanceof Point._class) {
			this.start = options.start;
		} else {
			// Top-middle
			this.start = Point(50, 0);
		}

		if (options.end instanceof Point._class) {
			this.end = options.end;
		} else {
			// Bottom-middle
			this.end = Point(50, 100);
		}

		this.stops = options.stops;
	}

	get stops() {
		return this._stops;
	}

	set stops(stops) {
		if (
			Array.isArray(stops) &&
			stops.every(([offset, colour]) => typeof offset === "number" && colour instanceof Colour)
		) {
			this._stops = stops;
		} else {
			this._stops = [];
		}
	}
}

module.exports = Gradient;
