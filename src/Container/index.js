// MobSin.Container

const _sortChildren = require("../lib/sortChildren");

function Container(_game, children = [], presets = {}) {
	_game.object.init(this, "MobSin.Container", {child: true});
	this.child.add(children);

	// The X and Y position
	this.pos = {
		x: presets.x || 0,
		y: presets.y || 0
	};

	// The z-axis for this sprite, allows for "layers" in your game world
	this.z = presets.z || 0;

	this._update = () => {
		for (i in _sortChildren(this.children)) {
			this.children[i]._update({
				x: this.pos.x,
				y: this.pos.y
			});
		}
	};
	this._render = (_ctx) => {
		const children = this.child.getAll()
		for (let i = 0, n = children.length; i < n; i++) {
			children[i]._render(_ctx);
		}
	};
}

module.exports = (...args) => new Container(...args);
