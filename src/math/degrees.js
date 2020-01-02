/**
 * Convert radians to degrees.
 *
 * @memberof Whirl.math
 *
 * @param {number} radians Value in radians.
 * @returns {number}
 *
 * @example
 * Whirl.math.degrees(0.7853981633974483); // 45
 * Whirl.math.radians(1.5707963267948966); // 90
 * Whirl.math.radians(6.283185307179586); // 360
 */
const degrees = (rad) => rad * (180 / Math.PI);

module.exports = degrees;
