// MobSin.input.keyboard

let keys = require("../../../keys");

let _game, sysId;
function handle_keyDown(evt) {
	_game.input.keysDown[evt.keyCode] = true;

	_game.input.event.emit("keyDown", {
		event: evt,
		keyCode: evt.keyCode,
		keyName: keys.getByKeyCode(evt.keyCode)
	});
}
function handle_keyUp(evt) {
	_game.input.keysDown[evt.keyCode] = false;

	_game.input.event.emit("keyUp", {
		event: evt,
		keyCode: evt.keyCode,
		keyName: keys.getByKeyCode(evt.keyCode)
	});
}
function keyIsDown(keyCode) {
	return _game.input.keysDown[keyCode] || false;
}

const keyboard = {
	// Set up the keyboard handler system for the first time
	setup: function() {
		if (sysId) {
			console.error("MobSin | A keyboard system has already been setup.");
			return false;
		}

		// If no key element is already defined, define it to defaults and add event listeners
		if (!this.input._keyElement) {
			keyboard.setKeyElement();
		}

		this.input.keysDown = [];
		this.input.keyIsDown = keyIsDown;

		sysId = this.object.init(this.input, "MobSin.system.input", {event: true}, false);
		return true;
	},

	// Set the target HTML element that keyboard event listeners will be added to
	// If no targetEl selector string is given then the document.body will be used
	setKeyElement: function(targetEl = document.body) {
		if (!_game) {
			_game = this;
		}
		if (this.input._keyElement) {
			// Unregister events from previous key element
			this.input._keyElement.removeEventListener("keydown", handle_keyDown);
		this.input._keyElement.removeEventListener("keyup", handle_keyUp);
		}

		this.input._keyElement = targetEl;
		this.input._keyElement.addEventListener("keydown", handle_keyDown);
		this.input._keyElement.addEventListener("keyup", handle_keyUp);
	}
};

module.exports = keyboard;
