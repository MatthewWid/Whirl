// MobSin.Game.setup

function setup(presets) {
	if (presets.canvas) {
		let mainViewport = this.viewportManager.add("main", presets.canvas, MobSin.STAGE, MobSin.CAMERA, {
			cW: presets.cW || presets.canvasWidth || canvas.width,
			cH: presets.cH || presets.canvasHeight || canvas.height
		});

		this.event.emit("didSetup", {
			game: this,
			viewport: mainViewport,
			canvas: mainViewport.c,
			stage: mainViewport.activeStage,
			camera: mainViewport.activeCamera
		});
	}

	return this;
}

module.exports = (_game) => {
	_game.setup = setup.bind(_game);
};