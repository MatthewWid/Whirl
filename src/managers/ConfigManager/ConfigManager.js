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
	 * @memberof Whirl.Game.ConfigManager#
	 * @type {object}
	 * 
	 * @property {boolean} [debug=false] Toggles debug mode on and off. Debug mode enables warnings, performance tips, verbose logging, etc.
	 * @property {boolean} [input mouse=true] `input mouse` Automatically attach mouse event listeners to canvasses.
	 * @property {boolean} [input keyboard=true] `input keyboard` Automatically attach keyboard event listeners to the document.
	 * @property {boolean} [input preventDefault=true] `input preventDefault` Prevent the default browser behaviour on mouse and keyboard input events.
	 * @property {string|null} [canvas=null] Selector for the default canvas to render to. Viewports can be assigned different canvasses, but if not specified then they will default to the canvas specified here.
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

	/**
	 * Set or add one or many key/value pairs.
	 * 
	 * You should keep the configuration map object flat by **not** giving an object as a value, this may produce unexpected behaviour when trying to set a value in the nested object.
	 * 
	 * @method Whirl.Game.ConfigManager#set
	 * 
	 * @param {string|object} key Key that identifies a value in the config map. If the key already exists then the value is overwriten, otherwise a new key/value pair is made.
	 * 	
	 * If an object is given, will instead merge the object values with the config map object.
	 * @param {any} [value] The value related to the key in the config map.
	 * Optional if the first argument is an object.
	 * @returns {any|object} If given a key/value pair, returns the given value. If given an object, the object is returned.
	 * 
	 * @example
	 * game.config.set("debug", true);
	 * game.config.set("canvas", "#myCanvas");
	 * game.config.set("input keyboard", true);
	 * 
	 * @example
	 * game.config.set({
	 * 	"debug": true,
	 * 	"canvas": "#myCanvas",
	 * 	"input keyboard": true
	 * });
	 */
	set(key, value) {
		if (typeof key === "string") {
			this._data[key] = value;
			return value;
		} else if (typeof key === "object") {
			this._data = {
				...this._data,
				...key
			};
			return key;
		}
	}

	/**
	 * Retrieve one or all values.
	 * 
	 * @method Whirl.Game.ConfigManager#get
	 * 
	 * @param {string} [key] Key of the key/value pair to retrieve the value from.
	 * @returns {any|object} The value related to the key. If the key is not given, returns the entire configuration map object.
	 */
	get(key) {
		if (!key) {
			return {...this._data};
		}
		return this._data[key];
	}
}

module.exports = ConfigManager;
