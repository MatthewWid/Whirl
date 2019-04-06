// MobSin.game.input

module.exports = (_game) => {
	// Extract configuration variables and import input methods
	const {input, inputElement} = _game.config;
	const keyboard = require("./keyboard");

	// Add setup functions to game input object
	_game.input = {
		setupKeyboard: keyboard.setup.bind(_game),
		setKeyElement: keyboard.setKeyElement.bind(_game)
	};

	// If `input` is true then set up all input systems with defaults
	if (!input) return;
	_game.input.setKeyElement(inputElement)
	_game.input.setupKeyboard();
};
