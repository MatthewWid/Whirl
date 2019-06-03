// Whirl.game.stageManager

module.exports = (_game) => {
	let Stage = require("./Stage");

	_game.stages = [];

	_game.stageManager = {
		add: (name, presets) => {
			let newInd = _game.stages.push(
				new Stage(_game, name, presets)
			) - 1;
			return _game.stages[newInd];
		},
		getByName: (name) => {
			return _game.stages.filter((e) => e.name === name);
		},
		getAll: () => {
			return _game.stages;
		},
		_updateAll: () => {
			for (let i = 0, n = _game.stages.length; i < n; i++) {
				_game.stages[i]._update();
			}
		}
	};
	_game.stage = (name) => _game.stageManager.getByName(name)[0] || null;
};
