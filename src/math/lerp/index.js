// MobSin.math.lerp

module.exports = (start, end, through) => {
	return (1 - through) * start + through * end;
};
