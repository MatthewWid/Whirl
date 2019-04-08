// MobSin.math.clamp

module.exports = (val, min, max) => {
	return Math.min(max, Math.max(min, val));
};
