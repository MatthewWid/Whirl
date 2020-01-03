const Texture = require("../Texture/");
const {Point} = require("../../geometry/");
const Colour = require("../Colour/");

/**
 * @classdesc
 * Represents a colour gradient that transitions between two or more {@link Whirl.Colour|colours} in a given space.
 *
 * @class Gradient
 * @memberof Whirl
 * @extends Whirl.Gradient
 *
 * @param {Whirl.Game} game Game instance this texture belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 */
class Gradient extends Texture {
	start;

	end;

	stops;

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

		if (
			Array.isArray(options.stops) &&
			options.stops.every(
				([offset, colour]) => typeof offset === "number" && colour instanceof Colour
			)
		) {
			this.stops = stops;
		} else {
			this.stops = [];
		}
	}
}

module.exports = Gradient;
