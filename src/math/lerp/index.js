// MobSin.math.lerp

module.exports = (start, end, through) => {
	return (start - end) * through + start;
};