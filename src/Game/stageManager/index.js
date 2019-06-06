// Whirl.game.stageManager

const Stage = require("../../Stage");
const createObjectManager = require("../../lib/objectManager.js");

module.exports = (_game) => {
	_game.stages = [];

	_game.stageManager = {
		add: (stage) => {
			return _game.stages.push(stage) - 1;
		},
		create: (name, presets) => {
			let newInd = _game.stages.push(
				Stage(_game, name, presets)
			) - 1;
			return _game.stages[newInd];
		},
		_updateAll: () => {
			for (let i = 0, n = _game.stages.length; i < n; i++) {
				_game.stages[i]._update();
			}
		}
	};
	createObjectManager(_game.stageManager, _game.stages);
	_game.stage = (name) => _game.stageManager.getByName(name)[0] || null;
};
