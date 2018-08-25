// MobSin.game.gameObject

module.exports = (_game) => {
	_game.globalIndex = 0;

	_game.object = {
		init: (that, presets) => {
			that._id = _game.globalIndex++;
			that._type = "";

			that.data = {};

			if (presets && presets.length > 0) {
				if (presets.indexOf("eventSystem") != -1 || presets.indexOf("eSys") != -1) {
					require("../../eventSystem")(that);
				}
				if (presets.indexOf("childSystem") != -1 || presets.indexOf("cSys") != -1) {
					require("../../eventSystem")(that);
				}
			}
		},
		nextID: () => {
			return _game.globalIndex++;
		}
	};
	_game.o = _game.object;
};