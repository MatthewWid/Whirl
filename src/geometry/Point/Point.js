const Geometry = require("../Geometry.js");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * Represents a point in space defined by an X and Y value.
 *
 * Can be used for things such as getting the distance or angle between two points, checking if a point is inside a rectangle, keeping track of where something is, etc.
 *
 * Points are constructed using the `Whirl.geometry.Point` factory method, but the underlying class can be accessed with `Whirl.geometry.Point._class`.
 *
 * @class Point
 * @memberof Whirl.geometry
 * @extends Whirl.geometry.Geometry
 *
 * @param {number} [x=0] X-coordinate of the point.
 * @param {number} [y=0] Y-coordinate of the point.
 *
 * @example
 * Whirl.geometry.Point(50, 90); // Point {x: 50, y: 90}
 */
class Point extends Geometry {
	/**
	 * X-coordiante of the point object.
	 *
	 * @memberof Whirl.geometry.Point#
	 * @type {number}
	 */
	x;

	/**
	 * Y-coordinate of the point object.
	 *
	 * @memberof Whirl.geometry.Point#
	 * @type {number}
	 */
	y;

	constructor(x, y) {
		super();

		this.x = x || 0;
		this.y = y || 0;
	}

	set(properties = {}) {
		this.x = getValue(properties, "x", this.x);
		this.y = getValue(properties, "y", this.y);

		return this;
	}

	/**
	 * Get the distance between this Point and another point.
	 *
	 * @method Whirl.geometry.Point#distanceFrom
	 *
	 * @param {number|Point} x X-coordinate of the point or a Point object itself. If a Point is provided then measure the distance from this Point to the given Point, instead of from this Point to the given X and Y values.
	 * @param {number} [y] Y-coordinate of the point.
	 * @returns {number} The distance between the two points.
	 *
	 * @example
	 * const point1 = Whirl.geometry.Point(50, 50); // Point {x: 50, y: 50}
	 * const point2 = Whirl.geometry.Point(90, 40); // Point {x: 90, y: 40}
	 *
	 * point1.distanceFrom(75, 75); // 35.355~...
	 * point1.distanceFrom(point2); // 41.231~...
	 */
	distanceFrom(px, py) {
		let x = px;
		let y = py;

		if (px instanceof Point) {
			x = px.x;
			y = px.y;
		}

		return Math.hypot(x - this.x, y - this.y);
	}

	duplicate() {
		return new Point(this.x, this.y);
	}
}

module.exports = (...args) => new Point(...args);
module.exports._class = Point;
