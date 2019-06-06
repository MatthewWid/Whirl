// Whirl.game.assetManager

const Asset = require("../../Asset");

module.exports = (_game) => {
	_game.assets = [];

	_game.assetManager = {
		load: (assetList = []) => {
			const newAssetArr = [];
			const totalToLoad = assetList.length;
			let totalLoaded = 0;
			let totalTime = 0;

			for (let i = 0, n = assetList.length; i < assetList.length; i++) {
				// Add the new asset object to the game asset list
				const newInd = _game.assets.push(
					Asset(_game, assetList[i].name, assetList[i].type, assetList[i].src)
				) - 1;
				newAssetArr[i] = _game.assets[newInd];

				/*
					When an asset loads add to the total load time,
					emit the 'didLoadAsset' event on the assetManager,
					check if it is the last asset to have loaded,
					if so, emit the 'didLoadAll' event providing all the new assets
					and the total time taken to load them.
				*/
				newAssetArr[i].event.onOnce("didLoad", ({asset, timeTaken}) => {
					totalLoaded++;
					totalTime += timeTaken;

					_game.assetManager.event.emit("didLoadAsset", {asset, timeTaken});

					if (totalLoaded == totalToLoad) {
						_game.assetManager.event.emit("didLoadAll", {
							newAssets: newAssetArr,
							timeTaken: totalTime
						});
					}
				});
			}

			return _game.assetManager;
		},
		getByName: (name) => {
			return _game.assets.filter((e) => e.name === name);
		},
		getAll: () => {
			return _game.assets;
		}
	};
	_game.asset = (name) => _game.assetManager.getByName(name)[0] || null;
	_game.object.init(_game.assetManager, "Whirl.system.assetManager", {event: true}, false);
};
