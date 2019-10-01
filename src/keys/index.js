const keyMap = require("./keyMap.js");
const getByName = require("./getByName.js");
const getByCode = require("./getByCode.js");

/**
 * Library of helper functions for retrieving keycodes, translating between keycodes and keynames and mapping keys to codes.
 * 
 * Should not be confused with the input manager's *keyboard* module which actually handles keyboard input events.
 * 
 * @namespace keys
 * @memberof Whirl
 */
const keys = {
	...keyMap,
	getByName,
	getByCode,
};

module.exports = keys;
