// MobSin.game.config

module.exports = (_game, presets) => {
	_game.config = {
		ignoreWarnings: presets.ignoreWarnings || false,
		input: true,
		...presets
	};
};
