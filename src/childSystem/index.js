// MobSin.childSystem

module.exports = (_game) => {
	_game.children = [];

	_game.child = {
		add: (newChild) => {
			_game.children.push(children);
		},
		get: (name) => {
			return _game.children.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.children;
		}
	}
};