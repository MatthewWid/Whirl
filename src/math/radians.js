/**
 * Convert degrees to radians.
 *
 * @memberof Whirl.math
 *
 * @param {number} degrees Value in degrees.
 * @returns {number}
 *
 * @example
 * Whirl.math.radians(45); // 0.7853981633974483
 * Whirl.math.radians(90); // 1.5707963267948966
 * Whirl.math.radians(360); // 6.283185307179586
 */
const radians = (deg) => (deg * Math.PI) / 180;

export default radians;
