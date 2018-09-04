// MobSin.game.viewportManager.Viewport.cameraManager

module.exports = (_obj) => {
	let Camera = require("./Camera");

	_obj.cameras = [];

	_obj.camera = {};
	_obj.c = _obj.camera;
};