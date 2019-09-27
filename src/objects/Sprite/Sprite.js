const Entity = require("../Entity/");

class Sprite extends Entity {
	fill;

	constructor(game, options = {}) {
		super(game, options);
	}
}

module.exports = (...args) => new Sprite(...args);
module.exports._class = Sprite;
