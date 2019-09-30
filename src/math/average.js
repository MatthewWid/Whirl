/**
 * Get the average of a set of numbers.
 * 
 * @memberof Whirl.math
 * 
 * @param {number[]} arr Array of numbers to retrieve the average of.
 * @returns {number} Average of the given array of numbers.
 * 
 * @example
 * Whirl.math.average([1, 2, 3]); // 2
 * Whirl.math.average([1, 2, 3, 4]); // 2.5
 * Whirl.math.average([8, 3, 9.2, 12, 5.5]); // 7.540000000000001
 */
const average = (arr) => {
	let sum = 0;
	for (let i = 0, n = arr.length; i < n; i++) {
		sum += arr[i];
	}
	return sum / arr.length;
};

module.exports = average;
