class Point {
	x;
	y;

	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	distanceFrom(px, py) {
		let x = px;
		let y = py;

		if (px instanceof Point) {
			x = px.x;
			y = px.y;
		}

		return Math.hypot(x - this.x, y - this.y);
	}
}

module.exports = (...args) => new Point(...args);
module.exports._class = Point;
