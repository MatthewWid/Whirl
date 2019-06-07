// Whirl.input.keyboard.eventRegisters.keyDown

const attemptPreventDefault = require("../../../../lib/attemptPreventDefault.js");
const formatKeyEvt = require("../formatKeyEvt.js");

const keyDown = (_game, element, emitter) => {
	element.addEventListener("keydown", (evt) => {
		attemptPreventDefault(_game, evt);

		if (_game.input.keysDown[evt.keyCode]) {
			return;
		}
		_game.input.keysDown[evt.keyCode] = true;

		const evtInfo = formatKeyEvt(evt);

		emitter.event.emit("keyDown", evtInfo);
	})
};

module.exports = keyDown;
