/**
 * Interpolates a value quadratically, starting slowly and speeding up.
 *
 * @function in
 * @memberof Whirl.easing.quadratic
 *
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 */
export default (t) => t * t;
