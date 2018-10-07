// MobSin.game.pluginManager

module.exports = (_game) => {
	_game.plugins = [];

	_game.pluginManager = {
		connect: (plugin) => {
			if (plugin instanceof Array) {
				for (let i = 0; i < plugin.length; i++) {
					_game.pluginManager.connect(plugin[i]);
				}
				return _game;
			}

			let newInd = _game.plugins.push(plugin) - 1;
			_game.object.init(_game.plugins[newInd], "CustomPlugin");
			_game.plugins[newInd].connected(_game);

			return _game;
		},
		_updateAll: () => {
			for (let i = 0; i < _game.plugins.length; i++) {
				if (_game.plugins[i].update) {
					_game.plugins[i].update(_game);
				}
			}
		}
	};
};