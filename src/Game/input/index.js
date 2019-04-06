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

	_game.event.on("didInitObject", (e) => {
		if (e.object._type === "MobSin.Viewport") {
			// Attach mouse event to e.object if `input` is true
		}
	});

	// If `input` is true then set up all input systems with default settings
	if (!input) return;
	_game.input.setKeyElement(inputElement)
	_game.input.setupKeyboard();
};
