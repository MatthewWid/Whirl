// Whirl.game.assetManager

module.exports = (_game) => {
	let Asset = require("./Asset");

	_game.assets = [];

	_game.assetManager = {
		load: (assetList = []) => {
			const newAssetArr = [];
			const totalToLoad = assetList.length;
			let totalLoaded = 0;
			let totalTime = 0;

			for (let i = 0, n = assetList.length; i < assetList.length; i++) {
				const newInd = _game.assets.push(
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

			return _game.assetManager;
		},
		getByName: (name) => {
			return _game.assets.filter((e) => e.name === name);
		},
		getAll: () => {
			return _game.assets;
		}
	};
	_game.object.init(_game.assetManager, "Whirl.system.assetManager", {event: true}, false);
};
