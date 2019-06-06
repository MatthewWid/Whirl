// Whirl.input.mouse

const setupMouse = require("./setupMouse.js");
const setMouseElement = require("./setMouseElement.js");
const registerMouseViewport = require("./registerMouseViewport.js");

const mouse = {
	setup: setupMouse,
	setMouseElement,
	registerMouseViewport
};

module.exports = mouse;
