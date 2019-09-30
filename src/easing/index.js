/**
 * Library of easing functions to alter the rate of change of a given value.
 * 
 * Commonly used for animations and tweening values over a period of time.
 * 
 * | Function | Description |
 * |-|-|
 * | Linear | No acceleration. |
 * | In | Acceleration from zero velocity. |
 * | Out | Deceleration to zero velocity. |
 * | In Out | Acceleration until halfway, then deceleration. |
 * 
 * @namespace easing
 * @memberof Whirl
 */
module.exports = {
	linear: require("./linear/"),
	quadratic: require("./quadratic/"),
	cubic: require("./cubic/"),
};
