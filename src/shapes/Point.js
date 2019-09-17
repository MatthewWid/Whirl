class Point {
	x;
	y;

	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
}

module.exports = (...args) => new Point(...args);
module.exports._class = Point;
