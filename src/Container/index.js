// MobSin.Container

function Container(_game, children = [], presets = {}) {
	_game.object.init(this, "MobSin.Container", {child: true});

	this._update = () => {};
	this._render = () => {};
}

module.exports = (...args) => new Container(...args);