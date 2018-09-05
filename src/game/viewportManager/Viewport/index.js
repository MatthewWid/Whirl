// MobSin.game.viewportManager.Viewport

let Rectangle = require("../../../shapes/Rectangle");

// A viewport is a screen that will be rendered to (A canvas)
// Takes a selector to find an HTML canvas
// Takes a game stage that contains objects to be rendered
// Takes a camera that culls and renders the objects to viewport
function Viewport(_game, name, canvas, activeStage, camera, presets = {}) {
	_game.object.init(this, "MobSin.viewport");

	// Mandatory presets
	this.name = name;
	this.activeStage = activeStage;

	// Set what canvas this viewport renders to
	// Changing the rendering canvas should be done with this method, not directly setting this.c or this.ctx
	this.setCanvas = (newCanvas) => {
		this.c = document.querySelector(newCanvas);
		this.ctx = this.c.getContext("2d");
	};
	this.setCanvas(canvas);

	// Optional presets with defaults
	this.c.width = presets.cW || this.c.width;
	this.c.height = presets.cH || this.c.height;
	this.renderable = presets.renderable || true;
	this.clear = presets.clear || true;

	// The x, y and width and height of this viewport
	this.bounds = new Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || this.c.width,
		presets.h || this.c.height
	);
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