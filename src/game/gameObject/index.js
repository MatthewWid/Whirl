// MobSin.game.gameObject

let eventSystem = require("../../systems/event");
let childSystem = require("../../systems/child");

module.exports = (_game) => {
	_game._globalIndex = 0;

	_game.object = {
		// Initialise a game object with standard properties that all objects in the game must have
		// Objects can optionally inherit the event system and child system
		init: (that, typeName, systems) => {
			that._id = _game.object.nextID();
			if (!that._type) {
				that._type = typeName;
			}

			that.data = {};

			if (systems && systems.length > 0) {
				if (systems.indexOf("eventSystem") != -1 || systems.indexOf("eSys") != -1) {
					eventSystem(that);
				}
				if (systems.indexOf("childSystem") != -1 || systems.indexOf("cSys") != -1) {
					childSystem(that);
				}
			}

			_game.object.globalStore.push(that);

			return that;
		},
		// Generate a new unique ID for a game object
		nextID: () => {
			return _game._globalIndex++;
		},
		// Get an object from the globalStore of objects based on either its name or ID
		get: (query) => {
			if (typeof query === "string") {
				return _game.object.globalStore.filter((e) => e.name === query);
			};
			if (typeof query === "number") {
				return _game.object.globalStore.filter((e) => e._id === query);
			}
		},
		// Get all objects from the globalStore
		getAll: () => {
			return _game.object.globalStore;
		},
		globalStore: []
	};
	_game.o = _game.object;
};