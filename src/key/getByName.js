import keys from "./keys";

/**
 * Get a keycode by its keyname.
 *
 * @memberof Whirl.key
 *
 * @param {string} keyName Keyname of a given key.
 * @returns {number|undefined} Keycode of the key related to the keyname.
 *
 * @example
 * Whirl.key.getByName("x"); // 88
 * Whirl.key.getByName("ArrowRight"); // 39
 * Whirl.key.getByName("Shift"); // 16
 */
const getByName = (keyName) => keys[keyName];

export default getByName;
