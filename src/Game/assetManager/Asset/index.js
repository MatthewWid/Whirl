// Whirl.game.assetManager.Asset

function Asset(_game, name, type, src) {
	_game.object.init(this, "Whirl.Asset", {event: true});
	// Mandatory presets
	this.name = name;
	this.type = type;
	this.src = src;

	this.data._loaded = false;

	const startLoad = performance.now();

	// Attach data and properties based on asset type
	switch (this.type) {
		case "image": {
			this.rawData = new Image();
			this.rawData.addEventListener("load", () => {
				this.data._loaded = true;
				this.event.emit("didLoad", {
					asset: this,
					timeTaken: parseInt(performance.now() - startLoad)
				});
			});
			this.rawData.src = this.src;
			break;
		}
		case "audio": {
			this.rawData = new Audio(this.src);
			this.rawData.addEventListener("loadeddata", () => {
				this.data._loaded = true;
				this.event.emit("didLoad", {
					asset: this,
					timeTaken: parseInt(performance.now() - startLoad)
				});
			});
			break;
		}
		// json
		// rawtext
	}
}

module.exports = Asset;
