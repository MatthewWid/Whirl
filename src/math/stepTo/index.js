// MobSin.math.stepTo

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
