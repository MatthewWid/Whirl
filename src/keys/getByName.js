const keyMap = require("./keyMap.js");

/**
 * Get a keycode by its keyname.
 *
 * @memberof Whirl.keys
 *
 * @param {string} keyName Keyname of a given key.
 * @returns {number|undefined} Keycode of the key related to the keyname.
 *
 * @example
 * Whirl.keys.getByName("x"); // 88
 * Whirl.keys.getByName("ArrowRight"); // 39
 * Whirl.keys.getByName("Shift"); // 16
 */
const getByName = (keyName) => keyMap[keyName];

module.exports = getByName;
