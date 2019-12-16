/**
 * Steps/Increments a given value towards a target value by a given increment.
 * If after stepping/incrementing the value it exceeds the target then the target itself will be returned.
 *
 * @memberof Whirl.math
 *
 * @param {number} val Value to alter with the given step.
 * @param {number} target Target value to step *val* towards.
 * @param {number} [increment=1] Increment to move the given value by.
 * @returns {number}
 *
 * @example
 * Whirl.math.stepTo(5, 10); // 6
 * Whirl.math.stepTo(5, 10, 3); // 8
 * Whirl.math.stepTo(6, 1, 3); // 3
 *
 * Whirl.math.stepTo(7, 0, 8); // 0
 * Whirl.math.stepTo(10, 14, 20); // 14
 */
const stepTo = (val, target, increment = 1) => {
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

module.exports = stepTo;
