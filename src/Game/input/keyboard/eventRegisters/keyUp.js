// Whirl.input.keyboard.eventRegisters.keyUp

const attemptPreventDefault = require("../../../../lib/attemptPreventDefault.js");
const formatKeyEvt = require("../formatKeyEvt.js");

const keyUp = (_game, element, emitter) => {
	element.addEventListener("keyup", (evt) => {
		attemptPreventDefault(_game, evt);

		if (!_game.input.keysDown[evt.keyCode]) {
			return;
		}
		_game.input.keysDown[evt.keyCode] = false;

		const evtInfo = formatKeyEvt(evt);

		emitter.event.emit("keyUp", evtInfo);
	})
};

module.exports = keyUp;
