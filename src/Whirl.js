/**
 * The global Whirl object that all constants, modules and game objects are attached to and derived from.
 *
 * @global
 * @namespace Whirl
 *
 */

/**
 * Denotes the current version of Whirl being used.
 *
 * @memberof Whirl
 * @type {string}
 * @static
 */
export const version = "0.3.0-alpha.11";

export * as math from "~/math";
export * as easing from "~/easing";
export * as util from "~/util";
export * as key from "~/key";
export * as geometry from "~/geometry";
export * as mixins from "~/mixins";
export * as render from "~/render";
export * from "~/objects";
