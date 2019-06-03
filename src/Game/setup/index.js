// Whirl.Game.setup

function didSetup(_game, setupData) {
	_game.event.emit("didSetup", {...setupData})
		.start();
}

function setup(presets) {
	let setupData = {
		game: this
	};

	if (presets.canvas) {
		const mainViewport = this.viewportManager.add("main", presets.canvas, Whirl.STAGE, Whirl.CAMERA, {
			cW: presets.cW || presets.canvasWidth || canvas.width,
			cH: presets.cH || presets.canvasHeight || canvas.height
		});
		setupData = {
			...setupData,
			viewport: mainViewport,
			canvas: mainViewport.c,
			stage: mainViewport.activeStage,
			camera: mainViewport.activeCamera
		};
	}
	if (presets.setup) {
		this.event.onOnce("didSetup", presets.setup);
		setupData.setup = presets.setup;
	}
	if (presets.update) {
		this.event.on("willUpdate", presets.update);
		setupData.update = presets.update;
	}
	if (presets.assets) {
		this.assetManager.load(presets.assets).event.on("didLoadAll", ({newAssets}) => {
			setupData.assets = newAssets;
			didSetup(this, setupData);
		});
		return this;
	}

	didSetup(this, setupData);
	return this;
}

module.exports = (_game) => {
	_game.setup = setup.bind(_game);
};
