const Manager = require("../Manager.js");

class DebugManager extends Manager {
	constructor(game) {
		super(game);
	}

	warn(text, source = "Generic") {
		if (this._game.config.get("debug")) {
			console.warn(`Whirl | ${source} | ${text}`);
		}
	}

	error(text, source = "Generic") {
		throw new Error(`Whirl | ${source} | ${text}`);
	}
}

module.exports = DebugManager;
