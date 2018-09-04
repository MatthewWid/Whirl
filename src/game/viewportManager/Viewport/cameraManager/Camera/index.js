// MobSin.game.viewportManager.Viewport.cameraManager.Camera

function Camera(_game, _viewport, name) {
	_game.object.init(this, "MobSin.camera");

	this.name = name;
}

module.exports = Camera;