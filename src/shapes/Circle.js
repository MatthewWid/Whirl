const Point = require("./Point.js");

class Circle {
	x;
	y;
	r;

	constructor(x, y, r) {
		// (Point, int)
		if (x instanceof Point._class) {
			this.x = x.x;
			this.y = x.y;
			this.r = y;
		// (int, int, int)
		} else {
			this.x = x || 0;
			this.y = y || 0;
			this.r = r || 0;
		}
	}

	get midpoint() {
		return Point(this.x, this.y);
	}

	isPointInside(px, py) {
		let x = px;
		let y = py;

		// (Point)
		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		return (x - this.x) * (x - this.x) + (y - this.y) * (y - this.y) <= this.r * this.r;
	}
}

module.exports = (...args) => new Circle(...args);
module.exports._class = Circle;
