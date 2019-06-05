// Whirl.game.config

const inputDefault = {
	input: true,
	mouse: true,
	keyboard: true,
	preventDefault: false
};

module.exports = (_game, presets) => {
	_game.config = {
		ignoreWarnings: presets.ignoreWarnings || false,
		...inputDefault,
		...presets
	};
};
