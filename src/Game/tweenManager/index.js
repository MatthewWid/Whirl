// MobSin.game.tweenManager

module.exports = (_game) => {
	let Tween = require("./Tween");

	_game.tweens = [];
	_game.tweenManager = {
		create: (_obj, from, to, time, presets) => {
			let newInd = _game.tweens.push(
				new Tween(_game, _obj, from, to, time, presets)
			) - 1;

			return _game.tweens[newInd];
		},
		getAll: () => {
			return _game.tweens;
		},
		updateAll: () => {
			for (let i = _game.tweens.length - 1; i >= 0; i--) {
				_game.tweens[i]._update();

				if (_game.tweenManager.purge && _game.tweens[i].finished) {
					_game.tweens.splice(i, 1);
				}
			}
		},
		// Whether tweens should be deleted out of the tweens list when they have finished
		purge: false
	};
	_game.t = _game.tweenManager;
};