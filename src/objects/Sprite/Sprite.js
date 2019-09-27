const Entity = require("../Entity/");
const getValue = require("../../lib/getValue.js");
const {Rectangle, Point} = require("../../shapes/");

class Sprite extends Entity {
	bounds;
	anchor;
	fill;

	constructor(game, options = {}) {
		super(game, options);

		if (options.bounds instanceof Rectangle._class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(
				getValue(options, "x", 0),
				getValue(options, "y", 0),
				getValue(options, "w", 0),
				getValue(options, "h", 0),
			);
		}

		if (options.anchor instanceof Point._class) {
			this.anchor = options.anchor;
		} else {
			this.anchor = Point(
				getValue(options, "anchorX", 0),
				getValue(options, "anchorY", 0),
			);
		}
	}
}

module.exports = (...args) => new Sprite(...args);
module.exports._class = Sprite;
