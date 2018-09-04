// MobSin.game.viewportManager

module.exports = (_game) => {
	let Viewport = require("./Viewport");

	_game.viewports = [];

	_game.viewportManager = {
		add: (name, canvas, activeStage, presets) => {
			let newInd = _game.viewports.push(
				new Viewport(_game, name, canvas, activeStage, presets)
			) - 1;
			return _game.viewports[newInd];
		},
		get: (name) => {
			return _game.viewports.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.viewports;
		}
	};
	_game.v = _game.viewportManager;
};