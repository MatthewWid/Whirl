// MobSin.shapes.Point

function Point(x, y) {
	this._shape = "point";
	this.x = x || 0;
	this.y = y || 0;

	this.set = (changes) => {
		this.x = changes.x || this.x;
		this.y = changes.y || this.y;

		return this;
	}
}

module.exports = (...args) => new Point(...args);