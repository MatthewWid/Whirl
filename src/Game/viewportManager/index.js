// Whirl.game.viewportManager

module.exports = (_game) => {
	let Viewport = require("./Viewport");

	_game.viewports = [];

	_game.viewportManager = {
		add: (name, canvas, activeStage, camera, presets) => {
			let newInd = _game.viewports.push(
				new Viewport(_game, name, canvas, activeStage, camera, presets)
			) - 1;
			return _game.viewports[newInd];
		},
		getByName: (name) => {
			return _game.viewports.filter((e) => e.name === name);
		},
		getAll: () => {
			return _game.viewports;
		}
	};
};
