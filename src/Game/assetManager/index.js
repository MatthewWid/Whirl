// Whirl.game.assetManager

module.exports = (_game) => {
	let Asset = require("./Asset");

	_game.assets = [];

	_game.assetManager = {
		// Provide either an object or an array of objects
		load: (assetList = []) => {
			// Returns the newly made asset if only an asset object is given (And not array)
			let newAssetArr = [];
			let totalLoaded = 0;
			let totalToLoad = assetList.length;
			let totalTime = 0;

			for (let i = 0, n = assetList.length; i < assetList.length; i++) {
				let newInd = _game.assets.push(
					new Asset(_game, assetList[i].name, assetList[i].type, assetList[i].src)
				) - 1;
				newAssetArr[i] = _game.assets[newInd];
				newAssetArr[i].event.onOnce("didLoad", (data) => {
					totalLoaded++;
					totalTime += data.timeTaken;

					_game.assetManager.event.emit("didLoadAsset", {...data});

					if (totalLoaded == totalToLoad) { // If all the new assets have finished loading
						_game.assetManager.event.emit("didLoadAll", {
							newAssets: newAssetArr,
							totalTimeTaken: totalTime
						});
					}
				});
			}

			return _game;
		},
		get: (name) => {
			return _game.assets.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.assets;
		}
	};
	_game.object.init(_game.assetManager, "Whirl.system.assetManager", {event: true}, false);
};
