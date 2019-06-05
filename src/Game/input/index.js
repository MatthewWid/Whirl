// Whirl.game.input

const keyboard = require("./keyboard");
const mouse = require("./mouse");

module.exports = (_game) => {
	const {input} = _game.config;

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
		_game.input.setMouseElement(input.mouseElement);
		_game.input.setupMouse();
	}
	if (input.keyboard) {
		_game.input.setKeyElement(input.keyElement);
		_game.input.setupKeyboard();
	}
};
