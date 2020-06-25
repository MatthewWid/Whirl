/**
 * Clamps a given value between a given minimum and maximum value.
 *
 * @memberof Whirl.math
 *
 * @param {number} val Value to be clamped.
 * @param {number} min Minimum value of the range.
 * @param {number} max Maximum value of the range.
 * @returns {number} Returns the given value if it falls within the range, otherwise returns the minimum maximum value if the given value is lower than or greater than the range, respectively.
 *
 * @example
 * Whirl.math.clamp(10, 5, 15); // 10
 * Whirl.math.clamp(12, 5, 15); // 12
 * Whirl.math.clamp(3, 5, 15); // 5
 * Whirl.math.clamp(19, 5, 15); // 15
 */
const clamp = (val, min, max) => {
	return Math.min(max, Math.max(min, val));
};

export default clamp;
