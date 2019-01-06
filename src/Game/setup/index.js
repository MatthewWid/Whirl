// MobSin.Game.setup

function setup(presets) {
	if (presets.canvas) {
		const mainViewport = this.viewportManager.add("main", presets.canvas, MobSin.STAGE, MobSin.CAMERA, {
			cW: presets.cW || presets.canvasWidth || canvas.width,
			cH: presets.cH || presets.canvasHeight || canvas.height
		});

		if (presets.setup) {
			this.event.onOnce("didSetup", presets.setup);
		}
		if (presets.update) {
			this.event.on("willUpdate", presets.update);
		}
		this.event.emit("didSetup", {
			game: this,
			viewport: mainViewport,
			canvas: mainViewport.c,
			stage: mainViewport.activeStage,
			camera: mainViewport.activeCamera,
			setup: presets.setup || null,
			update: presets.update || null
		});
	}

	return this;
}

module.exports = (_game) => {
	_game.setup = setup.bind(_game);
};