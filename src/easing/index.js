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
export {default as linear} from "./linear";
export {default as quadratic} from "./quadratic";
export {default as cubic} from "./cubic";
