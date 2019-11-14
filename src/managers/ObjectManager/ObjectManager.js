const Manager = require("../Manager.js");
const Base = require("../../objects/Base/");
const Viewport = require("../../objects/Viewport/");
const Stage = require("../../objects/Stage/");

class ObjectManager extends Manager {
	_index = 0;
	_store = [];
	_viewports = [];
	_stages = [];

	constructor(game) {
		super(game);
	}
	
	add(object) {
		if (!(object instanceof Base)) {
			this._game.debug.warn("Objects under a game instance must inherit from the Base object class.", "ObjectManager");

			return;
		}
		if (this._store.includes(object)) {
			this._game.debug.warn("Object already exists in the global store.", "ObjectManager");

			return;
		}

		object._id = this._index++;
		this._store.push(object);

		if (object instanceof Viewport._class) {
			this._viewports.push(object);
		}
		if (object instanceof Stage._class) {
			this._stages.push(object);
		}
	}
}

module.exports = ObjectManager;
