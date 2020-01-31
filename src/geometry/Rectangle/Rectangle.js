const Geometry = require("../Geometry.js");
const Point = require("../Point/");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * Represents a rectangle defined by its origin point and its width and height.
 *
 * Can be used for things such as world boundaries, sprite boundaries, collision detection, etc.
 *
 * Rectangles are constructed using the `Whirl.geometry.Rectangle` factory method, but the underlying class can be accessed with `Whirl.geometry.Rectangle._class`.
 *
 * @class Rectangle
 * @memberof Whirl.geometry
 * @extends Whirl.geometry.Geometry
 *
 * @param {number|Whirl.geometry.Point} [x=0] X-coordinate of the top-left origin point. If giving an instance of a Point the `y` parameter should also be a Point.
 * @param {number|Whirl.geometry.Point} [y=0] Y-coordinate of the top-left origin point. If *both* `x` and `y` are instead instances of a Point then the top-left point of the rectangle is defined by the first given Point, and the bottom-right point is defined by the second.
 * @param {number} [w=0] Width of the rectangle.
 * @param {number} [h=0] Height of the rectangle.
 *
 * @example
 * Whirl.geometry.Rectangle(40, 30, 100, 100); // Rectangle {x: 40, y: 30, w: 100, h: 100}
 *
 * @example
 * Whirl.geometry.Rectangle(
 * 	Whirl.geometry.Point(40, 30),
 * 	Whirl.geometry.Point(140, 130)
 * ); // Rectangle {x: 40, y: 30, w: 100, h: 100}
 */
class Rectangle extends Geometry {
	/**
	 * X-coordinate of the top-left point of the rectangle.
	 *
	 * @memberof Whirl.geometry.Rectangle#
	 * @type {number}
	 */
	x;

	/**
	 * Y-coordinate of the top-left point of the rectangle.
	 *
	 * @memberof Whirl.geometry.Rectangle#
	 * @type {number}
	 */
	y;

	/**
	 * Width of the rectangle.
	 *
	 * @memberof Whirl.geometry.Rectangle#
	 * @type {number}
	 */
	w;

	/**
	 * Height of the rectangle.
	 *
	 * @memberof Whirl.geometry.Rectangle#
	 * @type {number}
	 */
	h;

	constructor(x, y, w, h) {
		super();

		if (x instanceof Point._class && y instanceof Point._class) {
			this.x = x.x;
			this.y = x.y;
			this.w = y.x - x.x;
			this.h = y.y - x.y;
		} else {
			this.x = x || 0;
			this.y = y || 0;
			this.w = w || 0;
			this.h = h || 0;
		}
	}

	set(properties = {}) {
		this.x = getValue(properties, "x", this.x);
		this.y = getValue(properties, "y", this.y);
		this.w = getValue(properties, "w", this.w);
		this.h = getValue(properties, "h", this.h);

		return this;
	}

	/**
	 * Returns an instance of a Point representing the middle point of this rectangle.
	 *
	 * @alias Whirl.geometry.Rectangle#midpoint
	 * @type {Whirl.geometry.Point}
	 * @readonly
	 *
	 * @example
	 * Whirl.geometry.Rectangle(0, 0, 100, 100).midpoint; // Point {x: 50, y: 50}
	 */
	get midpoint() {
		return Point(this.x + this.w / 2, this.y + this.h / 2);
	}

	/**
	 * Area of this rectangle.
	 *
	 * @alias Whirl.geometry.Rectangle#area
	 * @type {number}
	 * @readonly
	 *
	 * @example
	 * Whirl.geometry.Rectangle(0, 0, 100, 100).area; // 10000
	 */
	get area() {
		return this.w * this.h;
	}

	/**
	 * Returns an array of Points representing the four vertices of this rectangle.
	 * Points are sorted in the following order: Top-left, top-right, bottom-right, bottom-left.
	 *
	 * @alias Whirl.geometry.Rectangle#vertices
	 * @type {Whirl.geometry.Point[]}
	 * @readonly
	 *
	 * @example
	 * Whirl.geometry.Rectangle(0, 0, 100, 100).vertices;
	 * //	[
	 * //		Point {x: 0, y: 0},
	 * //		Point {x: 100, y: 0},
	 * //		Point {x: 100, y: 100},
	 * //		Point {x: 0, y: 100},
	 * //	]
	 */
	get vertices() {
		return [
			Point(this.x, this.y),
			Point(this.x + this.w, this.y),
			Point(this.x + this.w, this.y + this.h),
			Point(this.x, this.y + this.h),
		];
	}

	/**
	 * Determine if a point is inside this rectangle.
	 *
	 * @method Whirl.geometry.Rectangle#isPointInside
	 *
	 * @param {number|Whirl.geometry.Point} x X-coordinate of the point. An instance of a Point object can be given instead as the only argument to determine if it is inside this rectangle.
	 * @param {number} [y] Y-coordinate of the point.
	 * @returns {boolean}
	 *
	 * @example
	 * Whirl.geometry.Rectangle(0, 0, 100, 100).isPointInside(45, 79); // true
	 *
	 * @example
	 * const point = Whirl.geometry.Point(36, 85);
	 * const rect = Whirl.geometry.Rectangle(0, 0, 100, 100);
	 *
	 * rect.isPointInside(point); // true
	 */
	isPointInside(px, py) {
		let x = px;
		let y = py;

		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		return this.x <= x && this.x + this.w >= x && this.y <= y && this.y + this.h >= y;
	}

	/**
	 * Determine if a rectangle overlaps this rectangle.
	 *
	 * If an edge touches/is equal to another edge, it is still overlaps the outer rectangle.
	 *
	 * @method Whirl.geometry.Rectangle#overlaps
	 *
	 * @param {number|Whirl.geometry.Rectangle} x X-coordinate of the rectangle. An instance of a Rectangle object can be given instead as the only argument to determine if it overlaps this rectangle.
	 * @param {number} [y] Y-coordinate of the rectangle.
	 * @param {number} [w] Width of the rectangle.
	 * @param {number} [h] Height of the rectangle.
	 * @returns {boolean}
	 *
	 * @example
	 * const rectangle1 = Whirl.geometry.Rectangle(50, 50, 50, 50);
	 * const rectangle2 = Whirl.geometry.Rectangle(75, 75, 50, 50);
	 *
	 * rectangle1.overlaps(rectangle2); // true
	 *
	 * @example
	 * const rectangle1 = Whirl.geometry.Rectangle(50, 50, 50, 50);
	 *
	 * rectangle1.overlaps(75, 75, 50, 50); // true
	 */
	overlaps(x, y, w, h) {
		if (x instanceof Rectangle) {
			y = x.y;
			w = x.w;
			h = x.h;
			x = x.x;
		}

		return this.x <= x + w && this.x + this.w >= x && this.y <= y + h && this.y + this.h >= y;
	}

	/**
	 * Determine if this rectangle wholly contains another rectangle.
	 *
	 * If an edge touches/is equal to another edge, it is still contained by the outer rectangle.
	 *
	 * @param {number|Whirl.geometry.Rectangle} x X-coordinate of the rectangle. An instance of a Rectangle object can be given instead as the only argument to determine if it is contained by this rectangle.
	 * @param {number} [y] Y-coordinate of the rectangle.
	 * @param {number} [w] Width of the rectangle.
	 * @param {number} [h] Height of the rectangle.
	 * @returns {boolean}
	 */
	contains(x, y, w, h) {
		if (x instanceof Rectangle) {
			y = x.y;
			w = x.w;
			h = x.h;
			x = x.x;
		}

		return this.x <= x && this.x + this.w >= x + w && this.y <= y && this.y + this.h >= y + h;
	}

	duplicate() {
		return new Rectangle(this.x, this.y, this.w, this.h);
	}
}

module.exports = (...args) => new Rectangle(...args);
module.exports._class = Rectangle;
