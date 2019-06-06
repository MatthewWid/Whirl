// Whirl.input.mouse.eventRegisters.mouseClick

const attemptPreventDefault = require("../../../../lib/attemptPreventDefault.js");
const formatMouseEvt = require("../formatMouseEvt.js");

// Register event listener for mouse click
const mouseClick = (_game, element, emitter) => {
	element.addEventListener("click", (evt) => {
		attemptPreventDefault(_game, evt);

		const evtInfo = formatMouseEvt(evt);

		emitter.event.emit("mouseClick", evtInfo);
	});
};

module.exports = mouseClick;
