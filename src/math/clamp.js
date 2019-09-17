const clamp = (val, min, max) => {
	return Math.min(max, Math.max(min, val));
};

module.exports = clamp;
