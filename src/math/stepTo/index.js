// MobSin.math.stepTo

/*
	Step the value 'val' towards 'target' by 'increment'
	Will return 'target' if the stepped 'val' exceeds the 'target'
	Eg,
		MobSin.math.stepTo(5, 10, 2)
		> 7

		MobSin.math.stepTo(6, 1, 3)
		> 3

		MobSin.math.stepTo(7, 0, 8)
		> 0

		MobSin.math.stepTo()
*/
module.exports = (val, target, increment = 1) => {
	if (val == target) {
		return val;
	}
	if (val < target) {
		const newVal = val + increment;

		if (newVal > target) {
			return target;
		} else {
			return val + increment;
		}
	} else {
		const newVal = val - increment;

		if (newVal < target) {
			return target;
		} else {
			return val - increment;
		}
	}
};