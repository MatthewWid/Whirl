// MobSin.generic

function Container(_game, name) {
	_game.object.init(this, "MobSin.container", ["childSystem"]);

	this.name = name;

	return this;
}

module.exports = Container;