// MobSin.game.input

// Set the target HTML element that event listeners will be added to
function setTargetEl(_game, targetEl) {
	_game.input._targetElement = document.querySelector(targetEl) || document.body;
}

// Prepares the game to receive various kinds of inputs
// Setup the input object and target element
function setup(inputEl) {
	setTargetEl(this, inputEl);

	return this.input;
}

module.exports = (_game, presets) => {
	_game.input = {
		setup: setup.bind(_game),
		setupKeyboard: require("./keyboard").bind(_game)
	};

	if (presets.noInput) return;
	_game.input
		.setup(presets.inputElement)
		.setupKeyboard();
};