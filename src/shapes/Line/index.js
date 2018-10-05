// MobSin.shapes.Line

function Line(x1, y1, x2, y2) {
	this._shape = "line";
	this.from = {
		x: x1 || 0,
		y: y1 || 0
	};
	this.to = {
		x: x2 || 0,
		y: y2 || 0
	};
}

module.exports = (x1, y1, x2, y2) => new Line(x1, y1, x2, y2);