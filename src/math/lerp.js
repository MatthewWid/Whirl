/**
 * Linearly interpolate between two values.
 *
 * @memberof Whirl.math
 *
 * @param {number} start Beginning value.
 * @param {number} end End value.
 * @param {number} through Value to be used as the interpolant between the start and end values (Generally `0-1`).
 * @returns {number} The selected point in between the two values.
 *
 * @example
 * Whirl.math.lerp(0, 100, 0.1); // 10
 * Whirl.math.lerp(0, 50, 0.5); // 25
 * Whirl.math.lerp(50, 0, 0.5); // 25
 * Whirl.math.lerp(0, 50, 2); // 100
 */
const lerp = (start, end, through) => {
	return (1 - through) * start + through * end;
};

module.exports = lerp;
