// MobSin.math.roundTo

/*
	Round a value 'num' to the nearest multiple of a value 'rounder'
	Eg,
		MobSin.math.roundTo(89, 100)
		> 100

		MobSin.math.roundTo(25, 100)
		> 0

		MobSin.math.roundTo(5, 10)
		> 10
*/
module.exports = (num, rounder = 1) => {
	return Math.round(num / rounder) * rounder;
};