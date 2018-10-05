// MobSin.shapes.rectangle

let shapes = require("../");

function Rectangle(x, y, w, h) {
	this._shape = "rectangle";
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;

	this.set = (changes) => {
		this.x = changes.x || this.x;
		this.y = changes.y || this.y;
		this.w = changes.w || this.w;
		this.h = changes.h || this.h;

		return this;
	};
	this.getMidpoint = () => {
		return {
			x: this.x + this.w / 2,
			y: this.y + this.h / 2
		};
	};
}

module.exports = (x, y, w, h) => new Rectangle(x, y, w, h);