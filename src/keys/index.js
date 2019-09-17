const keyMap = require("./keyMap.js");
const getByName = require("./getByName.js");
const getByCode = require("./getByCode.js");

const keys = {
	...keyMap,
	getByName,
	getByCode,
};

module.exports = keys;
