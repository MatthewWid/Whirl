// MobSin.game.tweenManager

let Tween = require("./Tween");
let TweenGroup = require("./TweenGroup");

module.exports = (_game) => {
	_game.tweens = [];
	_game.tweenManager = {
		create: (_obj, from, to, time, presets) => {
			let newInd = _game.tweens.push(
				new Tween(_game, _obj, from, to, time, presets)
			) - 1;

			return _game.tweens[newInd];
		},
		createGroup: (tweens, presets) => {
			return new TweenGroup(tweens, presets);
		},
		getAll: () => {
			return _game.tweens;
		},
		destroyAll: () => {
			_game.tweens = [];
		},
		_updateAll: () => {
			for (let i = _game.tweens.length - 1; i >= 0; i--) {
				_game.tweens[i]._update();

				if (_game.tweenManager.purge &&
					_game.tweens[i].finished &&
					_game.tweens[i].canPurge
				) {
					_game.object.destroyById(_game.tweens[i]._id);
					_game.tweens.splice(i, 1);
				}
			}
		},
		// Whether tweens should be deleted out of the tweens list when they have finished
		purge: true
	};
};