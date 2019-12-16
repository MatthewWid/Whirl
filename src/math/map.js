/**
 * Extrapolate how far through a given range of values a point is to another given range of values.
 *
 * For example, **five (5)** is **fifty percent (50%)** of the way between **zero (0)** and **ten (10)**. To map that given point linearly between the range zero (0) to ten (10) to the range **fifty (50)** to **one-hundred (100)** would mean going **fifty percent (50%)** of the way between fifty (50) and one-hundred (100) to get **seventy-five (75)**.
 *
 * @memberof Whirl.math
 *
 * @param {number} value Value to use as a point between the first given range.
 * @param {number} in_min Lower bound of the input range.
 * @param {number} in_max Upper bound of the input range.
 * @param {number} out_min Lower bound of the output range.
 * @param {number} out_max Upper bound of the output range.
 * @returns {number}
 *
 * @example
 * Whirl.math.map(5, 3, 7, 50, 100); // 75
 * Whirl.math.map(25, 0, 50, 100, 200); // 150
 * Whirl.math.map(75, 50, 100, 1000, 2000); // 1500
 * Whirl.math.map(5, 10, 20, 100, 200); // 50
 */
const map = (value, in_min, in_max, out_min, out_max) => {
	return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

module.exports = map;
