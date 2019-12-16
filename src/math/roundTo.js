/**
 * Rounds a given value to the nearest multiple of a given value.
 * If no rounding number is given, will round the value to the nearest integer.
 *
 * @memberof Whirl.math
 *
 * @param {number} num Number to be rounded.
 * @param {number} [rounder=1] Multiple to round the given value to.
 * @returns {number}
 *
 * @example
 * Whirl.math.roundTo(7.93); // 8
 * Whirl.math.roundTo(89, 100); // 100
 * Whirl.math.roundTo(24, 100); // 0
 * Whirl.math.roundTo(5, 10); // 10
 * Whirl.math.roundTo(1729, 200); // 1800
 */
const roundTo = (num, rounder = 1) => {
	return Math.round(num / rounder) * rounder;
};

module.exports = roundTo;
