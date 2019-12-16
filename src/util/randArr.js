/**
 * Get the value from a random index of the given array.
 *
 * @memberof Whirl.util
 *
 * @param {any[]} arr Array to retrieve the value from.
 * @returns {any}
 *
 * @example
 * Whirl.util.randArr([1, 5, "2", {x: 5}]); // "2"
 * Whirl.util.randArr([1, 5, 2]); // 2
 * Whirl.util.randArr([3, 8, 9, 9, 1, 6]); // 9
 */
const randArr = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
};

module.exports = randArr;
