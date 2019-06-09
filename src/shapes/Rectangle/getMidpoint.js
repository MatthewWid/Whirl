// Whirl.shapes.Rectangle.getMidpoint

function getMidpoint() {
	return {
		x: this.x + this.w / 2,
		y: this.y + this.y / 2
	};
}

module.exports = getMidpoint;
