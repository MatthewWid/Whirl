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
		this._data[key] = value;

		return value;
	}

	get(key) {
		return this._data[key];
	}
}

module.exports = ConfigManager;
