// MobSin.shapes.Point

function Point(x, y) {
	this.shape = "point";
	this.x = x || 0;
	this.y = y || 0;
}

module.exports = Point;