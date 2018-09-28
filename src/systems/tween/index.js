// MobSin.systems.tween

module.exports = (_game, _obj) => {
	_obj.tween = (from, to, time, presets = {}) => {
		let modifyObject = _obj;
		if (presets.modify) {
			modifyObject = _obj[presets.modify];
		}
		return _game.tweenManager.create(modifyObject, from, to, time, presets);
	};
};