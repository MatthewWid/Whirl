// Whirl.shapes.Line

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

	this.set = (changes) => {
		console.log(changes);
		this.from = {
			x: (changes.from || {}).x || this.from.x,
			y: (changes.from || {}).y || this.from.y
		};
		this.to = {
			x: (changes.to || {}).x || this.to.x,
			y: (changes.to || {}).y || this.to.y
		};

		return this;
	};
}

module.exports = (...args) => new Line(...args);
