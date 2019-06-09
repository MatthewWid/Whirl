// Whirl.shapes.Circle.isPointInside

function isPointInside(x, y) {
	const xSquared = (x - this.x) * (x - this.x);
	const ySquared = (y - this.y) * (y - this.y);
	const rSquared = this.r * this.r;
	return (
		(xSquared + ySquared) <= rSquared
	);
}

module.exports = isPointInside;
