/**
 * Interpolates a value cubically, starting slowly, speeding up toward the half-way point, and slowing down again.
 *
 * @function inOut
 * @memberof Whirl.easing.cubic
 *
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 */
module.exports = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
