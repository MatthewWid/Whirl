/**
 * Determine if the given value is within a given range.
 * 
 * @memberof Whirl.math
 * 
 * @param {number} val Value to be checked if it is between the minimum and maximum value.
 * @param {number} min Minimum value of the range.
 * @param {number} max Maximum value of the range.
 * @param {number} [leniency=0] Will return true if the value is outside of the minimum or maximum range but still within the **leniency** value's range from the minimum or maximum value.
 * @returns {boolean}
 * 
 * @example
 * Whirl.math.between(8, 5, 10); // true
 * Whirl.math.between(12, 5, 10); // false
 * Whirl.math.between(12, 5, 10, 4); // true
 */
const between = (val, min, max, leniency = 0) => {
	return (min - leniency) <= val && val < (max + leniency);
};

module.exports = between;
