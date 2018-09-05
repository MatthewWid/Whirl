// MobSin.game.stageManager.Stage

let Rectangle = require("../../../shapes/Rectangle");

// The stage is the game world that holds all of your game objects
// Think of them as a level for your game, you can swap out stages to render in your viewport
// By default, stages will update even when not being rendered
function Stage(_game, name, presets = {}) {
	_game.object.init(this, "MobSin.stage", ["childSystem"]);

	this.name = name;
	this.renderable = presets.renderable || true;
	
	// The limits of the game world that objects and textures should not be able to surpass
	this.limits = new Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);
}

module.exports = Stage;