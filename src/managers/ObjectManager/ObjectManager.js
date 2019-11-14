const Manager = require("../Manager.js");
const Base = require("../../objects/Base/");
const Viewport = require("../../objects/Viewport/");
const Stage = require("../../objects/Stage/");

/**
 * @classdesc
 * The object manager handles the storage and meta-data related to all objects that exist in the game instance such as all objects' uniquely given `_id` property.
 * 
 * For the vast majority of use cases you will never need to interact with the ObjectManager directly, but for more advanced uses such as plugin development and debugging you may need to modify certain details about how the game stores objects and how object receive data from the game instance.
 * 
 * @class ObjectManager
 * @memberof Whirl.Game
 */
class ObjectManager extends Manager {
	/**
	 * Incrementing index used to generate unique object IDs.
	 * 
	 * @ignore
	 * @memberof Whirl.Game.ObjectManager#
	 * @type {number}
	 * @readonly
	 */
	_index = 0;
	
	/**
	 * Array of all objects that currently exist in the game instance including viewports and stages.
	 * 
	 * @memberof Whirl.Game.ObjectManager#
	 * @type {object[]}
	 * @readonly
	 */
	_store = [];

	/**
	 * Array of all viewports that currently exist in the game instance.
	 * 
	 * @memberof Whirl.Game.ObjectManager#
	 * @type {object[]}
	 * @readonly
	 */
	_viewports = [];

	/**
	 * Array of all stages that currently exist in the game instance.
	 * 
	 * @memberof Whirl.Game.ObjectManager#
	 * @type {object[]}
	 * @readonly
	 */
	_stages = [];

	constructor(game) {
		super(game);
	}
	
	/**
	 * Add an object to the object manager list. This will make the engine aware of this objects existence, but will not have any noticable effect.
	 * 
	 * Will abort and log a warning if the object does not extend from the `Base` class or already exists in the object store.
	 * 
	 * If the object is an instance of a `Stage` or `Viewport` it will additionally be put into the `_stages` or `_viewports` store, respectively.
	 * 
	 * @method Whirl.Game.ObjectManager#add
	 * 
	 * @param {object} object Object to be added to the object manager.
	 */
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
