// Whirl.game.config

const merge = require("deepmerge");
const {defaultConfig} = require("../../constants");

module.exports = (_game, presets) => {
	_game.config = merge(defaultConfig, presets);

	// If `input` is set to `true` then set `input` back to the proper defaults
	if (_game.config.input === true) {
		_game.config.input = defaultConfig.input;
	}
};
