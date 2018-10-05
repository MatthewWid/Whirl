// MobSin.game.input

let keys = require("../../keys");

function handle_keyDown(evt) {
	this.input.keysDown[evt.keyCode] = true;

	this.input.event.emit("keyDown", {
		event: evt,
		keyCode: evt.keyCode,
		keyName: keys.getByKeyCode(evt.keyCode)
	});
}
function handle_keyUp(evt) {
	this.input.keysDown[evt.keyCode] = false;

	this.input.event.emit("keyUp", {
		event: evt,
		keyCode: evt.keyCode,
		keyName: keys.getByKeyCode(evt.keyCode)
	});
}

function setTarget(_game, newTarget) {
	_game.input._targetElement = document.querySelector(newTarget) || document.body;

	_game.input._targetElement.addEventListener("keydown", handle_keyDown.bind(_game));
	_game.input._targetElement.addEventListener("keyup", handle_keyUp.bind(_game));
}

module.exports = (_game, presets) => {
	_game.input = {
		keysDown: [],
		keyIsDown: (keyCode) => {
			return _game.input.keysDown[keyCode];
		}
	};
	_game.object.init(_game.input, "MobSin.system.input", {event: true}, false);
	_game.i = _game.input;

	setTarget(_game, presets.inputElement);
};