class ConfigManager {
	_game;
	_data = {
		...ConfigManager.defaultConfig,
	};

	static defaultConfig = {
		"debug": true, // Enable warnings/performance tips/verbose logging
		"input mouse": true, // Listen for mouse inputs
		"input keyboard": true, // Listen for keyboard inputs
		"input preventDefault": true, // Prevent input default behaviour
		"canvas": null, // Canvas to render to ('null' = create a new canvas)
	};

	constructor(game) {
		this._game = game;
	}

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

	get(key) {
		if (!key) {
			return {...this._data};
		}
		return this._data[key];
	}
}

module.exports = ConfigManager;
