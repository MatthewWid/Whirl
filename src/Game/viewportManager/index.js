// Whirl.game.viewportManager

const createObjectManager = require("../../lib/objectManager.js");

module.exports = (_game) => {
	let Viewport = require("./Viewport");

	_game.viewports = [];

	_game.viewportManager = {
		add: (name, canvas, activeStage, camera, presets) => {
			let newInd = _game.viewports.push(
				new Viewport(_game, name, canvas, activeStage, camera, presets)
			) - 1;
			return _game.viewports[newInd];
		}
	};
	createObjectManager(_game.viewportManager, _game.viewports);
	_game.viewport = (name) => _game.viewportManager.getByName(name)[0] || null;
};
