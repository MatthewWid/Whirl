// Whirl.shapes.Rectangle.isPointInside

function isPointInside(x, y) {
	return (
		(this.x <= x) && (this.x + this.w >= x) &&
		(this.y <= y) && (this.y + this.h >= y)
	);
}

module.exports = isPointInside;
