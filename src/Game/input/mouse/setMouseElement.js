// Whirl.input.setMouseElement

const eventRegisters = require("./eventRegisters");

/*
	Set the base element that mouse events will be listened on (Default: <body>)
	Listens with all mouse events
*/
function setMouseElement(targetEl = document.body) {
	this.input._mouseElement = targetEl;
	
	Object.keys(eventRegisters).forEach((register) => {
		eventRegisters[register](this, targetEl, this.input);
	});

	return this;
}

module.exports = setMouseElement;
