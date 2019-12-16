const keyMap = require("./keyMap.js");

/**
 * Get a keyname by its keycode.
 *
 * @memberof Whirl.keys
 *
 * @param {number} keyCode Keycode of a given key.
 * @returns {string|undefined} Name of the key related to the keycode.
 *
 * @example
 * Whirl.keys.getByCode(88); // "x"
 * Whirl.keys.getByCode(39); // "ArrowRight"
 * Whirl.keys.getByCode(16); // "Shift"
 */
const getByCode = (keyCode) => Object.keys(keyMap).find((key) => keyMap[key] === keyCode);

module.exports = getByCode;
