const keyMap = require("./keyMap.js");

const getByCode = (keyCode) => Object.keys(keyMap).find(key => keyMap[key] === keyCode);

module.exports = getByCode;
