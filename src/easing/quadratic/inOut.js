/**
 * Interpolates a value quadratically, starting slowly, speeding up toward the half-way point, and slowing down again.
 * 
 * @function inOut
 * @memberof Whirl.easing.quadratic
 * 
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 */
module.exports = (t) => (t < .5) ? (2 * t * t) : (-1 + (4 - 2 * t) * t);
