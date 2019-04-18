// Whirl.math.random

module.exports = (a, b) => {
	if (typeof a === "number" && typeof b === "number") {
		return Math.floor(Math.random() * (a - b) + b);
	} else if (typeof a === "number") {
		return Math.floor(Math.random() * a);
	}

	return Math.random();
};
