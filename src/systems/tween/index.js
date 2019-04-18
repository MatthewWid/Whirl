// Whirl.systems.tween

module.exports = (_game, _obj) => {
	// Pass the 'modify' preset to instead target the given objects target property and not the object itself
	_obj.tween = (from, to, time, presets = {}) => {
		let modifyObject = _obj;
		if (presets.modify) {
			modifyObject = _obj[presets.modify];
		}
		return _game.tweenManager.create(modifyObject, from, to, time, presets);
	};
};
