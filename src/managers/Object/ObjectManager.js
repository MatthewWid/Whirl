const Manager = require("../Manager.js");
const Base = require("../../objects/Base/");
const Viewport = require("../../objects/Viewport/");

class ObjectManager extends Manager {
	_index = 0;
	_store = [];
	_viewports = [];

	constructor(game) {
		super(game);
	}
	
	add(object) {
		if (!(object instanceof Base)) {
			throw new Error("Whirl | Objects under a game instance must inherit from the Base object class.");
		}

		object._id = this._index++;
		this._store.push(object);

		if (object instanceof Viewport._class) {
			this._viewports.push(object);
		}
	}
}

module.exports = ObjectManager;
