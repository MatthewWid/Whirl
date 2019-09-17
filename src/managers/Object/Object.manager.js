class ObjectManager {
	_game;
	_index = 0;
	_store = [];

	constructor(game) {
		this._game = game;
	}
	add(object) {
		object._id = this._index++;
		this._store.push(object);
	}
}

module.exports = ObjectManager;
