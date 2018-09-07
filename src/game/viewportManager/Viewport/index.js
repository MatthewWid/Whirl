// MobSin.game.viewportManager.Viewport

let Rectangle = require("../../../shapes/Rectangle");
let Camera = require("../../../Camera");

/*
	A viewport is a screen that will be rendered to (A canvas)
	Takes a selector to find an HTML canvas
	Takes a game stage that contains objects to be rendered
	Takes a camera that culls and renders the objects to viewport

	Presets can be:
	- cW
	- cH
	- x
	- y
	- w
	- h
	- renderable
	- clear
	- bg
*/
function Viewport(_game, name, canvas, activeStage, camera, presets = {}) {
	_game.object.init(this, "MobSin.viewport");

	// Mandatory presets
	this.name = name;

	// Set what canvas this viewport renders to
	// Changing the rendering canvas should be done with this method, not directly setting this.c or this.ctx
	this.setCanvas = (newCanvas) => {
		this.c = document.querySelector(newCanvas);
		this.ctx = this.c.getContext("2d");
	};
	this.setCanvas(canvas);

	this.c.width = presets.cW || this.c.width;
	this.c.height = presets.cH || this.c.height;

	// The x, y and width and height of this viewport
	this.bounds = new Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || this.c.width,
		presets.h || this.c.height
	);

	this.setStage = (newStage) => {
		if (newStage === "_DEFAULTSTAGE") {
			this.activeStage = _game.stageManager.add(this.name + "_stage", {
				x: 0,
				y: 0,
				w: this.bounds.w,
				h: this.bounds.h
			});
		} else {
			this.activeStage = activeStage;
		}
	}
	this.setStage(activeStage);

	this.setCamera = (newCamera) => {
		if (newCamera === "_DEFAULTCAMERA") {
			this.camera = new Camera(_game, this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
		} else {
			this.camera = newCamera;
		}
	};
	this.setCamera(camera);

	// Optional presets with defaults
	this.renderable = presets.renderable || true;
	this.clear = presets.clear || true;

	// Used for debugging - will be removed later
	this.bg = presets.bg || null;

	this.render = () => {
		if (this.clear) {
			this.ctx.clearRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
		}
		if (this.bg) {
			this.ctx.fillStyle = this.bg;
			this.ctx.fillRect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
		}
	};
}

module.exports = Viewport;