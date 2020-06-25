/**
 * Returns a shuffled copy of a given array.
 * Does not mutate the original array.
 *
 * @memberof Whirl.util
 *
 * @param {any[]} arr Array to be copied and shuffled.
 * @returns {any[]} Deep copy of the shuffled array.
 *
 * @example
 * Whirl.util.shuffleArr([1, 5, 3, 2]); // [2, 5, 3, 1]
 * Whirl.util.shuffleArr([1, 5, 3, 2]); // [2, 1, 5, 3]
 */
const shuffleArr = (arr) => {
	let shuffled = [...arr];
	let counter = shuffled.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);

		counter--;

		let temp = shuffled[counter];
		shuffled[counter] = shuffled[index];
		shuffled[index] = temp;
	}

	return shuffled;
};

export default shuffleArr;
