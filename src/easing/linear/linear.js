/**
 * Implies a linear rate of change.
 * 
 * @memberof Whirl.easing.linear
 * 
 * @param {number} t Interpolant between one (1) and zero(0).
 * @returns {number}
 * 
 * @example
 * Whirl.easing.linear(.5); // .5
 * Whirl.easing.linear(.2); // .2
 */
const linear = (t) => t;

module.exports = linear;
