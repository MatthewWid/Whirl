// Whirl.shapes.rectangle

const getMidpoint = require("./getMidpoint.js");
const isPointInside = require("./isPointInside.js");

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

	this.getMidpoint = getMidpoint.bind(this);
	this.isPointInside = isPointInside.bind(this);
}

module.exports = (...args) => new Rectangle(...args);
