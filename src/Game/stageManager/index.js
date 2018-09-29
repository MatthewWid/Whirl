// MobSin.game.stageManager

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
		get: (name) => {
			return _game.stages.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.stages;
		},
		updateAll: () => {
			// Sort children by 'z' in stages and calculate their physical boundaries from the world to canvas
			for (let i = 0, n = _game.stages.length; i < n; i++) {
				let objectList = _game.stages[i]._sortChildren();

				for (let j = 0, m = objectList.length; j < m; j++) {
					let object = objectList[j];

					object._calculatePhysBounds();
				}
			}
		}
	};
	_game.s = _game.stageManager;
};