/**
 * Library of helper functions for retrieving keycodes, translating between keycodes and keynames and mapping keys to codes.
 *
 * Should not be confused with the input manager's *keyboard* module which actually handles keyboard input events.
 *
 * @namespace key
 * @memberof Whirl
 */
export {default as keys} from "./keys";
export {default as getByCode} from "./getByCode";
export {default as getByName} from "./getByName";
