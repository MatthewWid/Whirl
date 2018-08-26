// MobSin.math.roundTo

module.exports = (num, rounder) => {
	return Math.round(num / rounder) * rounder;
};