/**
 * By default, returns a random float in the range of zero (0) to one (1) (inclusive of zero (0) but not of one (1)).
 * If **one** argument is given then return an integer in the range of zero (0) up to the given valu (non-inclusive).
 * If **two** arguments are given then will return an integer in the range between the two given arguments (inclusive of the first, exclusive of the second).
 *
 * @memberof Whirl.math
 *
 * @param {number} [a] If given without *b* being given, will be the upper bound of the range. If given **with** *b*, will be the lower bound of the range.
 * @param {number} [b] Upper bound of the range of the random number.
 * @returns {number}
 *
 * @example
 * Whirl.math.random(); // 0.6019569996537999
 * Whirl.math.random(); // 0.2947829307200911
 *
 * Whirl.math.random(5); // 0
 * Whirl.math.random(5); // 4
 *
 * Whirl.math.random(5, 10); // 7
 * Whirl.math.random(5, 10); // 9
 */
const random = (a, b) => {
	if (typeof a === "number" && typeof b === "number") {
		return Math.floor(Math.random() * (a - b) + b);
	} else if (typeof a === "number") {
		return Math.floor(Math.random() * a);
	}

	return Math.random();
};

module.exports = random;
