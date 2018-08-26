// MobSin.js v0.0.1
// By MatthewWid

// TODO:
// Split code so that the following are in separate files:
/*
	stdObj
	Asset Manager
	Stage Manager
	Viewport Manager
	Shapes
*/

console.log("WARNING: This version of MobSin is deprecated. It is recommended you upgrade to the lastest version of the engine ot be without worry of bugs, mistakes or unintended behaviour.");

function MobSin() {
	// The global index of all objects in the game
	// Assigns unique IDs to objects
	let globalIndex = 0;

	// If the game is playing or not
	this.playing = false;
	// The current frame count - How many times the game has updated
	this.frameCount = 0;

	// All game objects will "extend" this object so that they have these methods
	// Objects inheriting this can choose to inheret an event system and a child system as well via the cfg parameter
	// changables is a list of properties of the object that are allowed to be manipulated from outside the context of the object
	let stdObj = (that, cfg = {}, changables = []) => {
		that._id = globalIndex++;
		that._type = cfg.typeName ? cfg.typeName : "";
		that.data = {};

		that.set = (newCfg) => {
			for (let i = 0, n = changables.length; i < n; i++) {
				that[changables[i]] = newCfg[changables[i]] ? newCfg[changables[i]] : that[changables[i]];
			}
		}

		// Object event manager
		if (cfg.eventSystem) {
			that.events = {};
			that.event = that.evt = {
				create: (name, func) => {
					that.events[name] = func ? [func] : [];
				},
				listener: (name, func) => {
					that.events[name].push(func);
				},
				// TODO: Ability to remove events
				invoke: (name, params) => {
					if (that.events[name]) {
						for (let i = 0, n = that.events[name].length; i < n; i++) {
							that.events[name][i](params);
						}
						return true;
					}
					return false;
				}
			};
		}

		// Object child manager
		if (cfg.childSystem) {
			that.children = [];
			// Object children manager
			that.addChild = (newChild) => {
				if (typeof newChild === "object" && !Array.isArray(newChild)) {
					that.children.push(newChild);
				} else if (Array.isArray(newChild)) {
					for (let i = 0, n = newChild.length; i < n; i++) {
						that.addChild(newChild[i]);
					}
				}
			};
			that.getChildren = () => {
				return that.children;
			};
		}
	};
	this.initObj = (that, cfg) => stdObj(that, cfg);

	// Assets are imported reusable pieces of data for use in your game
	// Assets can be, for example, images, spritesheets, audio, JSON data, etc.
	this.assets = [];

	function asset(name, type, src) {
		stdObj(this, {
			typeName: "MobSin.asset",
			eventSystem: true
		}, [
			"name",
			"type"
		]);

		this.name = name;
		this.type = type;
		this.src = src;

		this.loaded = false;
		this.event.create("didLoad");

		if (this.type == "image") {
			this.img = new Image();
			this.img.onload = () => {
				this.loaded = true;
				this.event.invoke("didLoad");
			};
			this.img.src = this.src;
		}
	}

	// Asset Manager
	// this.a
	this.assetM = this.a = {
		add: (assetList) => {
			if (typeof assetList == "object" && !Array.isArray(assetList)) {
				let newInd = this.assets.push(
					new asset(assetList.name, assetList.type, assetList.src)
				) - 1;
				return this.assets[newInd];
			} else if (Array.isArray(assetList)) {
				for (let i = 0, n = assetList.length; i < assetList.length; i++) {
					this.assetM.add(assetList[i]);
				}
			}
			// Return the starting index of the assets array where the new asstes were inserted
			return this.assets.length - assetList.length;
		},
		get: (name) => {
			return this.assets.find((e) => e.name = name);
		},
		getAll: () => {
			return this.assets;
		}
	};

	// Stages are like levels of your game
	// Each stage is a separate world that holds objects
	this.stages = [];

	// Stage object definition
	function stage(name, childList = [], cfg = {}) {
		// Auto-generated
		stdObj(this, {
			typeName: "MobSin.stage",
			eventSystem: true,
			childSystem: true
		}, [
			"name",
			"children"
		]);

		// Mandatory presets
		this.name = name;
		this.children = childList;
	}

	// Stage Manager
	// this.s
	this.stageM = this.s = {
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
		}
	};

	// Viewports are canvasses that the game can render to
	// You can have multiple viewports associated with different canvasses and stages
	this.viewports = [];

	// Viewport object definition
	function viewport(name, canvas, stage = {}, cfg = {}) {
		// Auto-generated
		stdObj(this, {
			typeName: "MobSin.viewport",
			eventSystem: true
		}, [
			"name",
			"activeStage",
			"renderable",
			"clear",
			"x",
			"y",
			"w",
			"h"
		]);

		// Mandatory presets
		this.name = name;
		this.activeStage = stage;

		this.renderTo = (newCanvas) => {
			this.c = document.querySelector(newCanvas);
			this.ctx = this.c.getContext("2d");
		};
		this.renderTo(canvas);

		// Optional presets and defaults
		this.c.width = cfg.cW ? cfg.cW : this.c.width;
		this.c.height = cfg.cH ? cfg.cH : this.c.height;
		this.renderable = cfg.renderable ? cfg.renderable : true;
		this.clear = cfg.clear ? cfg.clear : true;
		this.x = cfg.x ? cfg.x : 0;
		this.y = cfg.y ? cfg.y : 0;
		this.w = cfg.w ? cfg.w : this.c.width;
		this.h = cfg.h ? cfg.h : this.c.height;

		this.setStage = () => {
			this.activeStage = stage;
		};
	}

	// Viewport Manager
	// this.vp
	this.viewportM = this.vp = {
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
		}
	};

	function shape_rect(name, x, y, w, h, cfg = {}) {
		stdObj(this, {
			typeName: "MobSin.shape.rect",
			eventSystem: true,
			childSystem: true
		}, [
			"name",
			"x",
			"y",
			"w",
			"h"
		]);

		this.name = name;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	function shape_circ(name, x, y, r, cfg = {}) {
		stdObj(this, {
			typeName: "MobSin.shape.circ",
			eventSystem: true,
			childSystem: true
		}, [
			"name",
			"x",
			"y",
			"r"
		]);

		this.name = name;
		this.x = x;
		this.y = y;
		this.r = r;

		this.render = (ctx) => {
			ctx.fillStyle = "rgb(255, 0, 0)";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		};
	}
	this.shape = {
		rect: (name, x, y, w, h, cfg) => {
			return new shape_rect(name, x, y, w, h, cfg);
		},
		circ: (name, x, y, r, cfg) => {
			return new shape_circ(name, x, y, r, cfg);
		}
	};

	// Give the game container standard objects properties
	stdObj(this, {
		typeName: "MobSin.gameContainer",
		eventSystem: true
	});

	// TODO: Put into init() method
	// Create events for standard game events
	this.event.create("willUpdate"); // Before any updates are run
	this.event.create("didUpdate"); // After updates are run

	this.event.create("willRender"); // Before rendering is done
	this.event.create("didRender"); // After rendering is done

	this.event.create("didStart"); // After the game is started
	this.event.create("didStop"); // After the game is stopped

	// Start/stop - Resume/pause the game
	this.start = () => {
		this.playing = true;
		this.event.invoke("didStart");
		update();
	};
	this.stop = () => {
		this.playing = false;
		this.event.invoke("didStop");
	};

	let update = () => {
		this.event.invoke("willUpdate");

		// Run physics, collisions, animations, tickers, timers,s renders, etc.
		render();

		this.event.invoke("didUpdate");
		if (this.playing) {
			this.frameCount++;
			requestAnimationFrame(update);
		}
	};

	let render = () => {
		this.event.invoke("willRender");
		for (let i = 0, n = this.viewports.length; i < n; i++) {
			let vp = this.viewports[i];
			if (vp.renderable) {
				if (vp.clear) {
					vp.ctx.clearRect(vp.x, vp.y, vp.w, vp.h);
				}
				if (vp.bg) {
					vp.ctx.fillStyle = vp.bg;
					vp.ctx.fillRect(vp.x, vp.y, vp.w, vp.h);
				}
			}
			// this.viewports[i].render();
		}
		this.event.invoke("didRender");
	};
}