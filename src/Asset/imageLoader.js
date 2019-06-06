// Whirl.game.assetManager.Asset.imageLoader

function loadImage(_asset) {
	const startLoad = performance.now();

	_asset.rawData = new Image();
	_asset.rawData.addEventListener("load", () => {
		_asset.data._loaded = true;
		_asset.event.emit("didLoad", {
			asset: _asset,
			timeTaken: parseInt(performance.now() - startLoad)
		});
	});
	_asset.rawData.src = _asset.src;
}

module.exports = loadImage;
