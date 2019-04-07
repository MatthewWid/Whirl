// MobSin.game.input

const keyboard = require("./keyboard");
const mouse = require("./mouse");

module.exports = (_game) => {
	// Extract configuration variables and import input methods
	const {input, keyElement} = _game.config;

	// Add setup functions to game input object
	_game.input = {
		setupKeyboard: keyboard.setup.bind(_game),
		setKeyElement: keyboard.setKeyElement.bind(_game),
		registerMouseElement: mouse.registerMouseElement.bind(_game)
	};

	_game.event.on("requestMouseEvents", (e) => {
		if (e.object._type === "MobSin.Viewport" && _game.config.input) {
			// Attach mouse event to e.object if `input` is true
			_game.input.registerMouseElement(e.object);
		}
	});

	// If `input` is true then set up all input systems with default settings
	if (!input) return;
	_game.input.setKeyElement(keyElement)
	_game.input.setupKeyboard();
};
