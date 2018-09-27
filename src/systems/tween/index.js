// MobSin.systems.tween

module.exports = (_game, _obj) => {
	_obj.tween = (from, to, time, presets) => {
		_game.tweenManager.create(_obj, from, to, time, presets);
	};
};