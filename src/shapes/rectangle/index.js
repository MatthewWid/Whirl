// MobSin.shapes.rectangle

function Rectangle(x, y, w, h) {
	this.shape = "rectangle";
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 0;

	this.getMidpoint = () => {
		return {
			x: this.x + this.w / 2,
			y: this.y + this.h / 2
		};
	};
}

module.exports = Rectangle;