// Whirl.math.roundTo

module.exports = (num, rounder = 1) => {
	return Math.round(num / rounder) * rounder;
};
