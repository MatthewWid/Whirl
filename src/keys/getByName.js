const keyMap = require("./keyMap.js");

const getByName = (keyName) => keyMap[keyName];

module.exports = getByName;
