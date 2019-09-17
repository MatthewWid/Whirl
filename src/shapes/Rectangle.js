const Point = require("./Point.js");

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

	get midpoint() {
		return Point(
			(this.x + this.w) / 2,
			(this.y + this.h) / 2,
		);
	}

	get area() {
		return this.w * this.h;
	}

	get vertices() {
		return [
			Point(this.x, this.y),
			Point(this.x + this.w, this.y),
			Point(this.x + this.w, this.y + this.h),
			Point(this.x, this.y + this.h)
		];
	}

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
