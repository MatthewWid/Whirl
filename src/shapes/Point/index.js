// MobSin.shapes.Point

function Point(x, y) {
	this._shape = "point";
	this.x = x || 0;
	this.y = y || 0;
}

module.exports = (x, y) => Point(x, y);