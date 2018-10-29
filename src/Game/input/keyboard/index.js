// MobSin.input.keyboard

let keys = require("../../../keys");

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

function keyIsDown(_game, keyCode) {
	return _game.input.keysDown[keyCode];
}

module.exports = function() {
	this.input.keysDown = [];
	this.input.keyIsDown = keyIsDown;

	if (this.input._targetElement) {
		this.input._targetElement.addEventListener("keydown", handle_keyDown.bind(this));
		this.input._targetElement.addEventListener("keyup", handle_keyUp.bind(this));
	}

	this.object.init(this.input, "MobSin.system.input", {event: true}, false);
};