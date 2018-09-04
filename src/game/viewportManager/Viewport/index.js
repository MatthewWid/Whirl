// MobSin.game.viewportManager.Viewport

function Viewport(_game, name, canvas, activeStage, presets = {}) {
	_game.object.init(this, "MobSin.viewport");

	// Mandatory presets
	this.name = name;
	this.activeStage = activeStage;

	// Set what canvas this viewport renders to
	// Changing the rendering canvas should be done with this method, not directly setting this.c or this.ctx
	this.renderTo = (newCanvas) => {
		this.c = document.querySelector(newCanvas);
		this.ctx = this.c.getContext("2d");
	};
	this.renderTo(canvas);

	// Optional presets with defaults
	this.c.width = presets.cW || this.c.width;
	this.c.height = presets.cH || this.c.height;
	this.renderable = presets.renderable || true;
	this.clear = presets.clear || true;

	// The x, y and width and height of this viewport
	this.bounds = new _game.CONTAINER.shapes.Rectangle(
		presets.x || 0,
		presets.y || 0,
		presets.w || this.c.width,
		presets.h || this.c.height
	);
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

	require("./cameraManager")(this);
}

module.exports = Viewport;