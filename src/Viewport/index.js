// Whirl.game.viewportManager.Viewport

const Rectangle = require("../shapes/Rectangle");
const Camera = require("../Camera");

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
	- imageSmoothing
	- fitCamera
	- clip
*/
function Viewport(_game, name, canvas, activeStage, camera, presets = {}) {
	_game.object.init(this, "Whirl.Viewport");

	// Mandatory presets
	this.name = name || "";

	// Set what canvas this viewport renders to
	// Changing the rendering canvas should be done with this method, not directly setting this.c or this.ctx
	this.setCanvas = (newCanvas) => {
		this.c = document.querySelector(newCanvas);
		this.ctx = this.c.getContext("2d");

		return this;
	};
	this.setCanvas(canvas);

	this.c.width = presets.cW || this.c.width;
	this.c.height = presets.cH || this.c.height;

	// The x, y and width and height of this viewport
	this.bounds = Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || this.c.width,
		presets.h || this.c.height
	);

	this.setStage = (newStage) => {
		if (newStage === "_DEFAULTSTAGE") {
			this.activeStage = _game.stageManager.create(this.name, {
				x: 0,
				y: 0,
				w: this.bounds.w,
				h: this.bounds.h
			});
		} else {
			this.activeStage = activeStage;
		}

		return this;
	};
	this.setStage(activeStage);

	this.setCamera = (newCamera) => {
		if (newCamera === "_DEFAULTCAMERA") {
			this.activeCamera = Camera(_game, {
				x: this.bounds.x,
				y: this.bounds.y,
				w: this.bounds.w,
				h: this.bounds.h
			});
		} else {
			const firstCam = typeof this.activeCamera === "undefined";

			this.activeCamera = newCamera;

			// Fit the camera bounds to the same bounds as the viewport if it is the initial camera
			if (firstCam && (typeof presets.fitCamera == "undefined" || presets.fitCamera)) {
				this.activeCamera.bounds.x = this.bounds.x;
				this.activeCamera.bounds.y = this.bounds.y;
				this.activeCamera.bounds.w = this.bounds.w;
				this.activeCamera.bounds.h = this.bounds.h;
			}
		}

		return this;
	};
	this.setCamera(camera);

	// Whether images in the canvas should be anti-aliased (smoothed)
	this.imageSmoothing = presets.hasOwnProperty("imageSmoothing") ? presets.imageSmoothing : true;

	// Whether the canvas should be cleared at the beginning of each frame
	this.clear = presets.hasOwnProperty("clear") ? presets.clear : true;

	// Whether the viewport should clip out anything not within its boundaries
	this.clip = presets.hasOwnProperty("clip") ? presets.clip : true;

	// Bring the camera's scroll to the relative (0,0) point of the viewport
	this.bringCamera = () => {
		this.activeCamera.scroll.x = -this.bounds.x;
		this.activeCamera.scroll.y = -this.bounds.y;

		return this;
	};

	this._render = () => {
		this.ctx.save();

		if (!this.imageSmoothing) {
			this.ctx.imageSmoothingEnabled = false;
		}

		if (this.clip) {
			this.ctx.beginPath();
			this.ctx.rect(this.bounds.x, this.bounds.y, this.bounds.w, this.bounds.h);
			this.ctx.clip();
		}

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

	_game.event.emit("requestMouseEvents", {
		object: this
	});
}

module.exports = (...args) => new Viewport(...args);
