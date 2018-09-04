// MobSin.game.stageManager.Stage

function Stage(_game, name, presets = {}) {
	_game.object.init(this, "MobSin.stage", ["childSystem"]);

	this.name = name;
	this.renderable = presets.renderable || true;
	
	// Boundaries of the world
	this.bounds = new _game.CONTAINER.shapes.Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);
}

module.exports = Stage;