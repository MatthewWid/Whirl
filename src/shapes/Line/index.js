// MobSin.shapes.Line

function Line(x1, y1, x2, y2) {
	this.from = {
		x: x1,
		y: y1
	};
	this.to = {
		x: x2,
		y: y2
	};
}

module.exports = Line;