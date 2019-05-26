// Whirl.game.config

const inputDefault = {
	mouse: true,
	keyboard: true,
	preventDefault: false
};

module.exports = (_game, presets) => {
	_game.config = {
		ignoreWarnings: presets.ignoreWarnings || false,
		...presets
	};
	_game.config.input = {
		...inputDefault,
		..._game.config.input
	};
};
