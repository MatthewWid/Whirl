import keys from "./keys";

/**
 * Get a keyname by its keycode.
 *
 * @memberof Whirl.key
 *
 * @param {number} keyCode Keycode of a given key.
 * @returns {string|undefined} Name of the key related to the keycode.
 *
 * @example
 * Whirl.key.getByCode(88); // "x"
 * Whirl.key.getByCode(39); // "ArrowRight"
 * Whirl.key.getByCode(16); // "Shift"
 */
const getByCode = (keyCode) => Object.keys(keys).find((key) => keys[key] === keyCode);

export default getByCode;
