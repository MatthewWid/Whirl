// Whirl.game.viewportManager

const Viewport = require("../../objects/Viewport");
const createObjectManager = require("../../lib/objectManager.js");

module.exports = (_game) => {
	_game.viewports = [];

	_game.viewportManager = {
		add: (viewport) => {
			return _game.viewports.push(viewport) - 1;
		},
		create: (name, canvas, activeStage, camera, presets) => {
			let newInd = _game.viewports.push(
				Viewport(_game, name, canvas, activeStage, camera, presets)
			) - 1;
			return _game.viewports[newInd];
		}
	};
	createObjectManager(_game.viewportManager, _game.viewports);
	_game.viewport = (name) => _game.viewportManager.getByName(name)[0] || null;
};
