// Whirl.input.keyboard

const keys = require("../../../keys");
const setupKeyboard = require("./setupKeyboard.js");
const setKeyElement = require("./setKeyElement.js");

const keyboard = {
	setup: setupKeyboard,
	setKeyElement
};

module.exports = keyboard;
