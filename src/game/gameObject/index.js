// MobSin.game.gameObject

let systems = require("../../systems");

module.exports = (_game) => {
	_game._globalIndex = 0;

	_game.object = {
		// Initialise a game object with standard properties that all objects in the game must have
		// Objects can optionally inherit the event system and child system
		init: (that, typeName, useSystems = {}) => {
			that._id = _game.object.nextID();
			if (!that._type) {
				that._type = typeName;
			}

			that.data = {};

			if (useSystems.event) {
				systems.event(that);
			}
			if (useSystems.child) {
				systems.child(that);
			}
			if (useSystems.tween) {
				systems.tween(_game, that);
			}

			_game.object.globalStore.push(that);

			return that;
		},
		// Generate a new unique ID for a game object
		nextID: () => {
			return _game._globalIndex++;
		},
		// Retrieve objects from the global object store
		// Based on its given name
		getByName: (query) => {
			return _game.object.globalStore.filter((e) => e.name === query);
		},
		// Based on its internal ID
		getById: (query) => {
			return _game.object.globalStore.filter((e) => e._id === query);
		},
		// Based on its internal type
		getByType: (query) => {
			return _game.object.globalStore.filter((e) => e._type === query);
		},
		// Get all objects from the globalStore
		getAll: () => {
			return _game.object.globalStore;
		},
		globalStore: []
	};
	_game.o = _game.object;
};