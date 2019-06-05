// Whirl.game.config

const {defaultConfig} = require("../../constants");

module.exports = (_game, presets) => {
	_game.config = {
		...defaultConfig,
		...presets
	};
};
