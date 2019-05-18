// Whirl.Game.setup

function setup(presets) {
	let setupData = {};

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

	this.event.emit("didSetup", {...setupData});

	return this;
}

module.exports = (_game) => {
	_game.setup = setup.bind(_game);
};
