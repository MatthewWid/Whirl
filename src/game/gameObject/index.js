// MobSin.game.gameObject

module.exports = (_game) => {
	_game.globalIndex = 0;

	_game.object = {
		// Initialise a game object with standard properties that all objects in the game must
		// Objects can optionally inherit the event system and child system
		init: (that, typeName, systems) => {
			that._id = _game.globalIndex++;
			that._type = typeName;

			that.data = {};

			if (systems && systems.length > 0) {
				if (systems.indexOf("eventSystem") != -1 || systems.indexOf("eSys") != -1) {
					require("../../eventSystem")(that);
				}
				if (systems.indexOf("childSystem") != -1 || systems.indexOf("cSys") != -1) {
					require("../../childSystem")(that);
				}
			}
			return that;
		},
		// Generate a new unique ID for a game object
		nextID: () => {
			return _game.globalIndex++;
		}
	};
	_game.o = _game.object;
};