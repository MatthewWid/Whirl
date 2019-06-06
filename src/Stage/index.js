// Whirl.game.stageManager.Stage

const Rectangle = require("../shapes/Rectangle");
const _sortChildren = require("../lib/sortChildren");

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
	_game.object.init(this, "Whirl.Stage", {child: true});

	this.name = name || "";
	
	// The limits of the game world that objects and textures should not be able to surpass
	this.limits = Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || 0,
		presets.h || 0
	);

	this._update = () => {
		// Sort children by 'z' in stages and calculate their physical boundaries from the world to canvas
		for (i in _sortChildren(this.children)) {
			this.children[i]._update();
		}
	};
}

module.exports = (...args) => new Stage(...args);
