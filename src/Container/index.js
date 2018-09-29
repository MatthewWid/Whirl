// MobSin.Container

function Container(_game) {
	_game.object.init(this, "MobSin.Container", {child: true});
}

module.exports = (_game) => new Container(_game);