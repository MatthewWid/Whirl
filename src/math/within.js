/**
 * Determine if a value is within the given range from a target value (inclusive both sides).
 *
 * @memberof Whirl.math
 *
 * @param {number} val Value to be checked if it is within the range.
 * @param {number} target Target value.
 * @param {number} range Range from the target value.
 * @returns {boolean}
 *
 * @example
 * Whirl.math.within(10, 5, 5); // true
 * Whirl.math.within(10, 5, 4); // false
 * Whirl.math.within(0, 5, 10); // true
 *
 * @see Whirl.math.between
 */
const within = (val, target, range) => val <= target + range && val >= target - range;

module.exports = within;
