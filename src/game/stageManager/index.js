// MobSin.game.stageManager

module.exports = (_game) => {
	let Stage = require("./Stage");

	_game.stages = [];

	_game.stageManager = {
		add: (name) => {
			let newInd = _game.stages.push(
				new Stage(_game, name)
			) - 1;
			return _game.stages[newInd];
		},
		get: (name) => {
			return _game.stages.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.stages;
		}
	};
	_game.s = _game.stageManager;
};