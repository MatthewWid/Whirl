// MobSin.shapes.circle

function Circle(x, y, r) {
	this._shape = "circle";
	this.x = x || 0;
	this.y = y || 0;
	this.r = r || 0;
}

module.exports = (x, y, r) => new Circle(x, y, r);