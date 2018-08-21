function MobSin() {
	// The global index of all objects in the game
	// Assigns unique IDs to object
	let globalIndex = 0;

	// If the game is playing or not
	this.playing = false;
	this.frameCount = 0;

	// Viewports are canvasses that the game can render to
	// You can have multiple viewports associated with different canvasses and stages
	this.viewports = [];

	// Stages are like levels of your game
	// Each stage is a world that holds objects
	this.stages = [];

	// Stage object
	function stage(name, childList = [], cfg = {}) {
		// Auto-generated
		this._id = globalIndex++;
		this._type = "MobSin.stage";

		// Mandatory presets
		this.name = name;
		let children = [];

		// Methods
		this.addChild = (newChild) => {
			if (typeof newChild === "object") {
				children.push(obj);
			} else if (newChild instanceof Array) {
				children.concat(newChild);
			}
		};
		this.getChildren = () => {
			return children;
		};
	}

	// Stage Manager
	// this.s
	this.stage = this.s = {
		add: (name, childList = []) => {
			let newInd = this.stages.push(
				new stage(name, childList)
			) - 1;
			return this.stages[newInd];
		},
		get: (name) => {
			return this.stages.find((e) => e.name == name);
		},
		getAll: () => {
			return this.stages;
		},
		remove: (name) => {
			// TODO: Use destroy methods and call callback once done
			this.stages = this.stages.filter((e) => e.name != name);
		}
	};

	// Viewport object
	function viewport(name, canvas, stage = {}, cfg = {}) {
		let c = document.querySelector(canvas);
		let ctx = c.getContext("2d");
		c.width = cfg.width ? cfg.width : c.width;
		c.height = cfg.height ? cfg.height : c.height;

		// Auto-generated
		this._id = globalIndex++;
		this._type = "MobSin.viewport";

		// Mandatory presets
		this.name = name;
		this.c = document.querySelector(canvas);
		this.ctx = ctx;
		this.activeStage = stage;

		// Optional presets
		this.renderable = cfg.renderable ? cfg.renderable : true;
		this.clear = cfg.clear ? cfg.clear : true;
		this.bg = cfg.bg ? cfg.bg : undefined;

		// TODO: Add .set({}) to set multiple configuration variables at once

		// Methods
		this.setStage = () => {
			this.activeStage = stage;
		};
		this.removeStage = () => {
			this.activeStage = undefined;
		};
	}

	// Viewport Manager
	// this.vp
	this.viewport = this.vp = {
		add: (name, canvas, stage = {}, cfg) => {
			let newInd = this.viewports.push(
				new viewport(name, canvas, stage, cfg)
			) - 1;
			return this.viewports[newInd];
		},
		get: (name) => {
			return this.viewports.find((e) => e.name == name);
		},
		getAll: () => {
			return this.viewports;
		},
		remove: (name) => {
			this.viewports = this.viewports.filter((e) => e.name != name);
		}
	};

	this.start = () => {
		// TODO: Start timers, tickers and interpolations
		this.playing = true;
		update();
	};
	this.stop = () => {
		// TODO: Stop timers, tickers and interpolations
		this.playing = false;
	};

	let update = () => {
		if (this.playing) {
			render();
			this.frameCount++;
			requestAnimationFrame(update);
		}
	};

	let render = () => {
		for (let i = 0, n = this.viewports.length; i < n; i++) {
			let vp = this.viewports[i];
			if (vp.renderable) {
				if (vp.clear) {
					vp.ctx.clearRect(0, 0, vp.c.width, vp.c.height);
				}
				if (vp.bg) {
					vp.ctx.fillStyle = vp.bg;
					vp.ctx.fillRect(0, 0, vp.c.width, vp.c.height);
				}
			}
		}
	};
}