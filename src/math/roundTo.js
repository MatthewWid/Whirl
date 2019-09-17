const roundTo = (num, rounder = 1) => {
	return Math.round(num / rounder) * rounder;
};

module.exports = roundTo;
