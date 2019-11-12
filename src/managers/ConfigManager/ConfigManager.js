const Manager = require("../Manager.js");

/**
 * @classdesc
 * The configuration manager handles global game configuration and allows the storage and modification of arbitrary data.
 * 
 * At its core, it is a simply a map of key-value pairs that stores data used to configure the behaviour of the various systems in the engine.
 * 
 * You can also store your own data that you could use for addons such as your own custom game objects.
 * 
 * This manager is stored under the `config` namespace of the game instance object.
 * 
 * @class ConfigManager
 * @memberof Whirl.Game
 * @extends Whirl.Game.Manager
 * 
 * @example
 * const game = new Whirl.Game();
 * 
 * game.config.get(); // {...}
 * 
 * game.config.set("property", "value");
 * 
 * game.config.get(); // {..., property: "value"}
 * 
 * game.config.get("property"); // "value"
 */
class ConfigManager extends Manager {
	/**
	 * The object that actually stores the configuration data internally. You should **never access or modify this object directly**. Instead, make use of the `set` and `get` methods on the configuration manager.
	 * 
	 * This object comes with certain preset values that the game uses internally, but you can also add your own additional values if need be.
	 * 
	 * **JSDOC* does not support spaces in property names - all instances of underscores `_` should be treated as spaces in this object's proprty list.*
	 * 
	 * @memberof Whirl.Game.ConfigManager#
	 * @type {object}
	 * 
	 * @property {boolean} debug Toggles debug mode on and off. Debug mode enables warnings, performance tips, verbose logging, etc.
	 * @property {boolean} input_mouse `input mouse` Automatically attach mouse event listeners.
	 * @property {string|null} canvas Selector for the default canvas to render to. Viewports can be assigned different canvasses, but if not specified then they will default to the canvas specified here.
	 */
	_data = {
		...ConfigManager.defaultConfig,
	};

	static defaultConfig = {
		"debug": false, // Enable warnings/performance tips/verbose logging
		"input mouse": true, // Listen for mouse inputs
		"input keyboard": true, // Listen for keyboard inputs
		"input preventDefault": true, // Prevent input default behaviour
		"canvas": null, // Canvas to render to ('null' = create a new canvas)
	};

	constructor(game) {
		super(game);
	}

	set(key, value) {
		// (string, any)
		if (typeof key === "string") {
			this._data[key] = value;
			return value;
		// (object)
		} else if (typeof key === "object") {
			this._data = {
				...this._data,
				...key
			};
			return key;
		}
	}

	get(key) {
		if (!key) {
			return {...this._data};
		}
		return this._data[key];
	}
}

module.exports = ConfigManager;
