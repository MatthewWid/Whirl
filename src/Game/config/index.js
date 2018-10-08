// MobSin.game.config

module.exports = (_game, presets) => {
	_game.config = {
		ignoreWarnings: presets.ignoreWarnings || false,
		inputElement: document.querySelector(presets.inputElement) || document.body
	};
};