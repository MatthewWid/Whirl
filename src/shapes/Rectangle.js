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
}

module.exports = (...args) => new Rectangle(...args);
