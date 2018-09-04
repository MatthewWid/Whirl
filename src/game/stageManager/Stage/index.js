// MobSin.game.stageManager.Stage

let Rectangle = require("../../../shapes/Rectangle");

function Stage(_game, name, presets = {}) {
	_game.object.init(this, "MobSin.stage", ["childSystem"]);

	this.name = name;
	this.renderable = presets.renderable || true;
	
	// Boundaries of the world
	this.bounds = new Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);
}

module.exports = Stage;