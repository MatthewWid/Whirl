// Whirl.game.assetManager.Asset.audioLoader

function loadAudio(_asset) {
	const startLoad = performance.now();

	_asset.rawData = new Audio(_asset.src);
	_asset.rawData.addEventListener("loadeddata", () => {
		_asset.data._loaded = true;
		_asset.event.emit("didLoad", {
			asset: _asset,
			timeTaken: parseInt(performance.now() - startLoad)
		});
	});
}

module.exports = loadAudio;
