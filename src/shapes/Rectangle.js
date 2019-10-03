const Point = require("./Point.js");

/**
 * @classdesc
 * Represents a rectangle defined by its origin point and its width and height.
 * 
 * Can be used for things such as world boundaries, sprite boundaries, collision detection, etc.
 * 
 * Rectangles are constructed using the `Whirl.shapes.Rectangle` factory method, but the underlying class can be accessed with `Whirl.shapes.Rectangle._class`.
 * 
 * @class Rectangle
 * @memberof Whirl.shapes
 * 
 * @param {number|Whirl.shapes.Point} [x=0] X-coordinate of the top-left origin point. If giving an instance of a Point the `y` parameter should also be a Point.
 * @param {number|Whirl.shapes.Point} [y=0] Y-coordinate of the top-left origin point. If *both* `x` and `y` are instead instances of a Point then the top-left point of the rectangle is defined by the first Point, and the bottom-right point is defined by the second.
 * @param {number} [w=0] Width of the rectangle.
 * @param {number} [h=0] Height of the rectangle.
 * 
 * @example
 * Whirl.shapes.Rectangle(40, 30, 100, 100); // Rectangle {x: 40, y: 30, w: 100, h: 100}
 * 
 * @example
 * Whirl.shapes.Rectangle(
 * 	Whirl.shapes.Point(40, 30),
 * 	Whirl.shapes.Point(140, 130)
 * ); // Rectangle {x: 40, y: 30, w: 100, h: 100}
 */
class Rectangle {
	x;
	y;
	w;
	h;
	
	constructor(x, y, w, h) {
		// (Point, Point)
		if (x instanceof Point._class && y instanceof Point._class) {
			this.x = x.x;
			this.y = x.y;
			this.w = y.x - x.x;
			this.h = y.y - x.y;
		// (int, int, int, int)
		} else {
			this.x = x || 0;
			this.y = y || 0;
			this.w = w || 0;
			this.h = h || 0;
		}
	}

	/**
	 * Returns an instance of a Point representing the middle point of this rectangle.
	 * 
	 * @alias Whirl.shapes.Rectangle#midpoint
	 * @type {Whirl.shapes.Point}
	 * 
	 * @example
	 * Whirl.shapes.Rectangle(0, 0, 100, 100).midpoint; // Point {x: 50, y: 50}
	 */
	get midpoint() {
		return Point(
			(this.x + this.w) / 2,
			(this.y + this.h) / 2,
		);
	}

	/**
	 * The area of this rectangle.
	 * 
	 * @alias Whirl.shapes.Rectangle#area
	 * @type {number}
	 * 
	 * @example
	 * Whirl.shapes.Rectangle(0, 0, 100, 100).area; // 10000
	 */
	get area() {
		return this.w * this.h;
	}

	/**
	 * Returns an array of Points representing the four vertices of this rectangle.  
	 * Points are sorted in the following order: Top-left, top-right, bottom-right, bottom-left.
	 * 
	 * @alias Whirl.shapes.Rectangle#vertices
	 * @type {Whirl.shapes.Point[]}
	 * 
	 * @example
	 * Whirl.shapes.Rectangle(0, 0, 100, 100).vertices;
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
			Point(this.x, this.y + this.h)
		];
	}

	/**
	 * Determine if a point is inside this rectangle.
	 * 
	 * @method Whirl.shapes.Rectangle#isPointInside
	 * 
	 * @param {number|Whirl.shapes.Point} px X-coordinate of the point. An instance of a Point object can also be given instead as the only argument to determine if it is inside this rectangle.
	 * @param {number} [py] Y-coordinate of the point.
	 * @returns {boolean}
	 * 
	 * @example
	 * Whirl.shapes.Rectangle(0, 0, 100, 100).isPointInside(45, 79); // true
	 * 
	 * @example
	 * const point = Whirl.shapes.Point(36, 85);
	 * const rect = Whirl.shapes.Rectangle(0, 0, 100, 100);
	 * 
	 * rect.isPointInside(point); // true
	 */
	isPointInside(px, py) {
		let x = px;
		let y = py;

		// (Point)
		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		return (
			this.x <= x && this.x + this.w >= x &&
			this.y <= y && this.y + this.h >= y
		);
	}
}

module.exports = (...args) => new Rectangle(...args);
module.exports._class = Rectangle;
