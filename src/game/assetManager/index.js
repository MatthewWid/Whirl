// MobSin.game.assetManager

module.exports = (_game) => {
	function Asset(name, type, src) {
		_game.object.init(this, "MobSin.asset", ["eventSystem"]);

		// Mandatory presets
		this.name = name;
		this.type = type;
		this.src = src;

		this.data._loaded = false;

		let startLoad = Date.now();

		// Attach data and properties based on asset type
		switch (this.type) {
			case "image": {
				this.img = new Image();
				this.img.addEventListener("load", () => {
					this.data._loaded = true;
					this.event.emit("didLoad", {
						asset: this,
						timeTaken: Date.now() - startLoad
					});
				});
				this.img.src = this.src;
				break;
			}
			case "audio": {
				this.audio = new Audio(this.src);
				this.audio.addEventListener("loadeddata", () => {
					this.data._loaded = true;
					this.event.emit("didLoad", {
						asset: this,
						timeTaken: Date.now() - startLoad
					});
				});
				break;
			}
			// json
			// rawtext
		}
	}

	_game.assets = [];

	_game.assetManager = {
		// Provide either an object or an array of objects
		add: (assetList, progress = {
			num: 1,
			total: 1,
			progress: 1
		}) => {
			// Returns the newly made asset if only an asset object is given
			if (typeof assetList == "object" && !Array.isArray(assetList)) {
				let newInd = _game.assets.push(
					new Asset(assetList.name, assetList.type, assetList.src)
				) - 1;
				_game.assetManager.event.emit("willLoadAsset", {
					asset: _game.assets[newInd],
					num: progress.num,
					total: progress.total,
					progress: progress.progress
				});
				return _game.assets[newInd];
			// Returns an array of newly made assets if an array of asset objects is given
			} else if (Array.isArray(assetList)) {
				let newAssetArr = [];
				for (let i = 0, n = assetList.length; i < assetList.length; i++) {
					newAssetArr.push(
						_game.assetManager.add(assetList[i], {
							num: i + 1,
							total: n,
							progress: (i + 1) / n
						})
					);
				}
				return newAssetArr;
			}
		},
		get: (name) => {
			return _game.assets.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.assets;
		}
	};
	_game.object.init(_game.assetManager, "MobSin.system.assetManager", ["eventSystem"]);
	_game.a = _game.assetManager; // Alias to game.a
};