module.exports = (_game) => {
	function Asset(name, type, src) {
		// Default types

		this.name = name;
		this.type = type;
		this.src = src;

		this.loaded = false;
	}

	_game.assets = [];
	_game.assetManager = {
		add: (assetList) => {
			if (typeof assetList == "object" && !Array.isArray(assetList)) {
				let newInd = _game.assets.push(
					new Asset(assetList.name, assetList.type, assetList.src)
				) - 1;
				return _game.assets[newInd];
			} else if (Array.isArray(assetList)) {
				for (let i = 0, n = assetList.length; i < assetList.length; i++) {
					_game.assetManager.add(assetList[i]);
				}
			}
		}
	};
	_game.a = _game.assetManager;
};