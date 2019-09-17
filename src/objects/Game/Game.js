const ConfigManager = require("../../managers/Config/");
const UpdateManager = require("../../managers/Update/");
const ObjectManager = require("../../managers/Object/");

class Game {
	config = new ConfigManager(this);
	update = new UpdateManager(this);
	object = new ObjectManager(this);

	constructor() {
		// Expose manager methods at top-level
		this.start = this.update._start;
		this.stop = this.update._stop;
	}
}

module.exports = (...args) => new Game(...args);
module.exports._class = Game;
