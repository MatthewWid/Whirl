/**
 * Interpolates a value quadratically, starting quickly and slowing down.
 *
 * @function out
 * @memberof Whirl.easing.quadratic
 *
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 */
export default (t) => t * (2 - t);
