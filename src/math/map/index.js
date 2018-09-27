// MobSin.math.map

/*
	Map a range of values to another range of values, given a point in that range.
	Eg,
		MobSin.math.map(5, 3, 7, 50, 100)
		> 75
		// 5 is 50% of the way through 3 and 7
		// Map to 50% of the way through 50 and 100 giving 75
*/
module.exports = (value, in_min, in_max, out_min, out_max) => {
	return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};