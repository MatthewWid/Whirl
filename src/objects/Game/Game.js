const UpdateManager = require("../../managers/Update/");
const ObjectManager = require("../../managers/Object/");

class Game {
	// Managers
	update = new UpdateManager(this);
	object = new ObjectManager(this);

	// Constructor
	constructor() {
		// Expose manager methods at top-level
		this.start = this.update._start;
		this.stop = this.update._stop;
	}
}

module.exports = (...args) => new Game(...args);
module.exports._class = Game;
