class ConfigManager {
	_game;
	_data = {
		...ConfigManager.defaultConfig,
	};

	static defaultConfig = {
		"ignore warnings": false,
		"input mouse": true,
		"input keyboard": true,
		"input preventDefault": true,
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
