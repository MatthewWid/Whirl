// Whirl.input.setKeyElement

const eventRegisters = require("./eventRegisters");

// Set the target HTML element that keyboard event listeners will be added to.
// If no targetEl selector string is given then the document.body will be used
function setKeyElement(targetEl = document.body) {
	this.input._keyElement = targetEl;

	Object.keys(eventRegisters).forEach((register) => {
		eventRegisters[register](this, targetEl, this.input);
	});
}

module.exports = setKeyElement;
