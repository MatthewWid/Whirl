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
	- resizeCamera
*/
function Viewport(_game, name, canvas, activeStage, camera, presets = {}) {
	_game.object.init(this, "MobSin.Viewport");

	// Mandatory presets
	this.name = name || "";

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
	};
	this.setStage(activeStage);

	this.setCamera = (newCamera) => {
		if (newCamera === "_DEFAULTCAMERA") {
			this.activeCamera = new Camera(_game, {
				x: this.bounds.x,
				y: this.bounds.y,
				w: this.bounds.w,
				h: this.bounds.h
			});
		} else {
			this.activeCamera = newCamera;

			if (typeof presets.resizeCamera == "undefined" || presets.resizeCamera) {
				this.activeCamera.bounds.x = this.bounds.x;
				this.activeCamera.bounds.y = this.bounds.y;
				this.activeCamera.bounds.w = this.bounds.w;
				this.activeCamera.bounds.h = this.bounds.h;
			}
		}
	};
	this.setCamera(camera);

	// Optional presets with defaults
	this.renderable = presets.renderable || true;
	this.clear = presets.hasOwnProperty("clear") ? presets.clear : true;

	this._render = () => {
		this.ctx.save();

		if (this.clear) {
			this.ctx.clearRect(
				this.bounds.x,
				this.bounds.y,
				this.bounds.w,
				this.bounds.h
			);
		}

		// TODO: Replace canvas scaling with recursively reducing childrens dimensions
		const scroll = this.activeCamera._getScroll();
		this.ctx.translate(scroll.x, scroll.y);
		this.ctx.scale(this.activeCamera.zoom, this.activeCamera.zoom);

		const objectList = this.activeStage.child.getAll();
		for (let i = 0, n = objectList.length; i < n; i++) {
			objectList[i]._render(this.ctx); // Give camera offsets
		}

		this.ctx.restore();
	};
}

module.exports = Viewport;