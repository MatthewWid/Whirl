const Point = require("./Point.js");

class Rectangle {
	x;
	y;
	w;
	h;

	constructor(x, y, w, h) {
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
	}

	get midpoint() {
		return Point(
			(this.x + this.w) / 2,
			(this.y + this.h) / 2,
		);
	}

	isPointInside(px, py) {
		let x = px;
		let y = py;

		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		return (
			(this.x <= x) && (this.x + this.w >= x) &&
			(this.y <= y) && (this.y + this.h >= y)
		);
	}
}

module.exports = (...args) => new Rectangle(...args);
module.exports._class = Rectangle;
