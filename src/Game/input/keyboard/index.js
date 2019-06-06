// Whirl.input.keyboard

const keys = require("../../../keys");
const attemptPreventDefault = require("../../../lib/attemptPreventDefault.js");

let _game, sysId;
function handle_keyDown(evt) {
	attemptPreventDefault(_game, evt);

	if (_game.input.keysDown[evt.keyCode] === true) {
		return;
	}
	_game.input.keysDown[evt.keyCode] = true;

	_game.input.event.emit("keyDown", {
		rawEvent: evt,
		keyCode: evt.keyCode,
		keyName: keys.getByKeyCode(evt.keyCode)
	});
}
function handle_keyUp(evt) {
	attemptPreventDefault(_game, evt);
	
	if (_game.input.keysDown[evt.keyCode] === false) {
		return;
	}

	_game.input.keysDown[evt.keyCode] = false;

	_game.input.event.emit("keyUp", {
		rawEvent: evt,
		keyCode: evt.keyCode,
		keyName: keys.getByKeyCode(evt.keyCode)
	});
}
function keyIsDown(key) {
	return _game.input.keysDown[typeof key === "string" ? keys[key] : key] || false;
}
function keyIsUp(key) {
	return keyIsDown(key) !== true;
}

// Set up the keyboard handler system for the first time
function setup() {
	// If no key element is already defined, define it to defaults and add event listeners
	if (!this.input._keyElement) {
		keyboard.setKeyElement();
	}

	this.input.keysDown = [];
	this.input.keyIsDown = keyIsDown;
	this.input.keyIsUp = keyIsUp;

	return true;
}

// Set the target HTML element that keyboard event listeners will be added to
// If no targetEl selector string is given then the document.body will be used
function setKeyElement(targetEl = document.body) {
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

	return this;
}

const keyboard = {
	setup,
	setKeyElement
};

module.exports = keyboard;
