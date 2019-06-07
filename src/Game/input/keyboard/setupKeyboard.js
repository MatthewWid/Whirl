// Whirl.input.keyboard.setup

const setKeyElement = require("./setKeyElement.js");
const keyCheck = require("./keyCheck");

// Set up the keyboard handler system for the first time
function setup(targetEl) {
	/// Set the (default) element to listen for keyboard events on
	setKeyElement.call(this, targetEl);

	// Check if keys are pressed/not pressed in the update loop
	this.input.keysDown = [];
	Object.keys(keyCheck).forEach((check) => {
		this.input[check] = keyCheck[check];
	});

	return this;
}

module.exports = setup;
