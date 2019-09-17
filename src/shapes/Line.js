const Point = require("./Point.js");

class Line {
	x1;
	y1;
	x2;
	y2;

	constructor(x1, y1, x2, y2) {
		// (Point, Point, , )
		if (x1 instanceof Point._class && y1 instanceof Point._class) {
			this.x1 = x1.x;
			this.y1 = x1.y;
			this.x2 = y1.x;
			this.y2 = y1.y;
		// (int, int, int, int)
		} else {
			this.x1 = x1 || 0;
			this.y1 = y1 || 0;
			this.x2 = x2 || 0;
			this.y2 = y2 || 0;
		}
	}

	get length() {
		return Math.hypot(this.x1 - this.x2, this.y1 - this.y2);
	}

	get vertices() {
		return [
			Point(this.x1, this.y1),
			Point(this.x2, this.y2),
		];
	}
}

module.exports = (...args) => new Line(...args);
module.exports._class = Line;
