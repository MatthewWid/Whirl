const Manager = require("../Manager.js");

class ConfigManager extends Manager {
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
