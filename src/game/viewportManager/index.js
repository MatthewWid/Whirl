// MobSin.game.viewportManager

module.exports = (_game) => {
	function Viewport(name, canvas, activeStage, presets = {}) {
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
		this.bg = presets.bg || "rgba(0, 0, 0, 0)";
	}

	_game.viewports = [];

	_game.viewportManager = {
		add: (name, canvas, activeStage, presets) => {
			let newInd = _game.viewports.push(
				new Viewport(name, canvas, activeStage, presets)
			) - 1;
			return _game.viewports[newInd];
		},
		get: (name) => {
			return _game.viewports.find((e) => e.name == name);
		},
		getAll: () => {
			return _game.viewports;
		}
	};
	_game.v = _game.viewportManager;
};