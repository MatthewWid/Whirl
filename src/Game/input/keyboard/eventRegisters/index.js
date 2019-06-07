// Whirl.input.keyboard.eventRegisters

const keyDown = require("./keyDown.js");
const keyUp = require("./keyUp.js");

const eventRegisters = {
	keyDown,
	keyUp
};

module.exports = eventRegisters;
