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
	this.x = presets.x || 0;
	this.y = presets.y || 0;
	this.w = presets.w || this.c.width;
	this.h = presets.h || this.c.height;
	this.clear = presets.clear || true;
	this.bg = presets.bg || null;

	this.render = () => {
		if (this.clear) {
			this.ctx.clearRect(this.x, this.y, this.w, this.h);
		}
		if (this.bg) {
			this.ctx.fillStyle = this.bg;
			this.ctx.fillRect(this.x, this.y, this.w, this.h);
		}

		// Render all activeStage children
	};
}

module.exports = Viewport;