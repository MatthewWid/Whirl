/**
 * Interpolates a value cubically, starting quickly and slowing down.
 *
 * @function out
 * @memberof Whirl.easing.cubic
 *
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 */
module.exports = (t) => --t * t * t + 1;
