// MobSin.game.stageManager.Stage

let Rectangle = require("../../../shapes/Rectangle");

/*
	The stage is the game world that holds all of your game objects
	Think of them as a level for your game, you can swap out stages to render in your viewport
	By default, stages will update even when not being rendered

	Presets can be:
	- x
	- y
	- w
	- h
	- renderable
*/
function Stage(_game, name, presets = {}) {
	_game.object.init(this, "MobSin.stage", {child: true});

	this.name = name;
	this.renderable = presets.renderable || true;
	
	// The limits of the game world that objects and textures should not be able to surpass
	this.limits = new Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);

	this._sortChildren = () => {
		this.children.sort((current, next) => {
			if (current.z && next.z) {
				return current.z - next.z;
			} else {
				return 0;
			}
		});

		return this.children;
	};
}

module.exports = Stage;