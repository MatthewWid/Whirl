// Whirl.input.mouse.eventRegisters

const mouseClick = require("./mouseClick.js");
const mouseMove = require("./mouseMove.js");

// Register specific events with the given elements
const eventRegisters = {
	mouseClick,
	mouseMove
};

module.exports = eventRegisters;
