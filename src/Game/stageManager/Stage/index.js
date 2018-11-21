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
	_game.object.init(this, "MobSin.Stage", {child: true});

	this.name = name;
	
	// The limits of the game world that objects and textures should not be able to surpass
	this.limits = Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);

	this._sortChildren = () => {
		this.children.sort((curr, next) => {
			if (
				typeof curr.z != "undefined" &&
				typeof next.z != "undefined"
			) {
				return curr.z - next.z;
			} else {
				return 0;
			}
		});

		return this.children;
	};

	this._update = () => {
		// Sort children by 'z' in stages and calculate their physical boundaries from the world to canvas
		for (i in this._sortChildren()) {
			this.children[i]._update();
		}
	};
}

module.exports = Stage;