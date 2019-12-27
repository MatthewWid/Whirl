const Point = require("../Point/");

/**
 * @classdesc
 * Represents a line in space defined by two pairs of x-y coordinates representing both end-points of the line.
 *
 * Can be used for things such as ray-tracing, distance calculations, sight-line checks, etc.
 *
 * Lines are constructed using the `Whirl.geometry.Line` factory method, but the underlying class can be accessed with `Whirl.geometry.Line._class`.
 *
 * @class Line
 * @memberof Whirl.geometry
 *
 * @param {number|Whirl.geometry.Point} [x1=0] X-coordinate of the starting point. If giving an instance of a Point the `y1` parameter should also be a Point.
 * @param {number|Whirl.geometry.Point} [y1=0] Y-coordinate of the starting point. If *both* `x1` and `y1` are instead instances of a Point then the starting point is defined by the first given Point, and the ending point is defined by the second.
 * @param {number} [x2=0] X-coordinate of the ending point.
 * @param {number} [y2=0] Y-coordinate of the ending point.
 *
 * @example
 * Whirl.geometry.Line(50, 50, 100, 100); // Line {x1: 50, y1: 50, x2: 100, y2: 100}
 *
 * @example
 * Whirl.geometry.Line(
 * 	Whirl.geometry.Point(50, 50),
 * 	Whirl.geometry.Point(100, 100),
 * ); // Line {x1: 50, y1: 50, x2: 100, y2: 100}
 */
class Line {
	/**
	 * X-coordinate of the starting point.
	 *
	 * @memberof Whirl.geometry.Line#
	 * @type {number}
	 */
	x1;
	/**
	 * Y-coordinate of the starting point.
	 *
	 * @memberof Whirl.geometry.Line#
	 * @type {number}
	 */
	y1;
	/**
	 * X-coordinate of the ending point.
	 *
	 * @memberof Whirl.geometry.Line#
	 * @type {number}
	 */
	x2;
	/**
	 * Y-coordinate of the ending point.
	 *
	 * @memberof Whirl.geometry.Line#
	 * @type {number}
	 */
	y2;

	constructor(x1, y1, x2, y2) {
		if (x1 instanceof Point._class && y1 instanceof Point._class) {
			this.x1 = x1.x;
			this.y1 = x1.y;
			this.x2 = y1.x;
			this.y2 = y1.y;
		} else {
			this.x1 = x1 || 0;
			this.y1 = y1 || 0;
			this.x2 = x2 || 0;
			this.y2 = y2 || 0;
		}
	}

	/**
	 * Total length of this line.
	 *
	 * @alias Whirl.geometry.Line#length
	 * @type {number}
	 * @readonly
	 *
	 * @example
	 * Whirl.geometry.Line(50, 50, 100, 100).length; // 70.710~...
	 */
	get length() {
		return Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
	}

	/**
	 * Returns an array of Points representing the two vertices of this line.
	 * The first Point represents the starting point of the line, and the second Point represents the ending point.
	 *
	 * @alias Whirl.geometry.Line#vertices
	 * @type {Whirl.geometry.Point[]}
	 * @readonly
	 *
	 * @example
	 * Whirl.geometry.Line(50, 50, 100, 100).vertices;
	 * // [
	 * //		Point {x: 50, y: 50},
	 * //		Point {x: 100, y: 100},
	 * // ]
	 */
	get vertices() {
		return [Point(this.x1, this.y1), Point(this.x2, this.y2)];
	}
}

module.exports = (...args) => new Line(...args);
module.exports._class = Line;
