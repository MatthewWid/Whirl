const Base = require("../../objects/Base/");

class ObjectManager {
	_game;
	_index = 0;
	_store = [];

	constructor(game) {
		this._game = game;
	}
	
	add(object) {
		if (!(object instanceof Base)) {
			throw new Error("Whirl | Objects under a game instance must inherit from the Base object class.");
		}

		object._game = this._game;
		object._id = this._index++;
		this._store.push(object);
	}
}

module.exports = ObjectManager;
