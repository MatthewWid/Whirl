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
		setMouseElement: mouse.setMouseElement.bind(_game),
		registerMouseViewport: mouse.registerMouseViewport.bind(_game)
	};

	if (!input) return;
	if (input.mouse) {
		_game.input.setupMouse();
	}
	if (input.keyboard) {
		_game.input.setKeyElement(keyElement);
		_game.input.setupKeyboard();
	}
};
