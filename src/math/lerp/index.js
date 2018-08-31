// MobSin.math.lerp

/*
	Interpolate between two values 'start' and 'end' by the interpolant 'through'
	Eg,
		MobSin.math.lerp(50, 100, 0.1)
		> 55

		MobSin.math.lerp(50, 0, 0.5)
		> 25
*/
module.exports = (start, end, through) => {
	return (1 - through) * start + through * end;
};