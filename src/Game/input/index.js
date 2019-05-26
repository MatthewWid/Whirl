// Whirl.game.input

const keyboard = require("./keyboard");
const mouse = require("./mouse");

module.exports = (_game) => {
	// Extract configuration variables and import input methods
	const {input, keyElement} = _game.config;

	// Add setup functions to game input object
	_game.input = {
		setupKeyboard: keyboard.setup.bind(_game),
		setKeyElement: keyboard.setKeyElement.bind(_game),
		setupMouse: mouse.setup.bind(_game),
		registerMouseViewport: mouse.registerMouseViewport.bind(_game)
	};

	// If `input` is true then set up all input systems with default settings
	if (!input) return;
	_game.input.setupMouse();
	_game.input.setKeyElement(keyElement);
	_game.input.setupKeyboard();
};
