function MobSin_Engine() {
	var canvas, ctx;
	var canRun = false;
	var _game = this;

	function update() {
		for (var i = 0; i < _game.transitions.length; i++) {
			_game.transitions[i].update();
			if (_game.transitions[i].canKill) {
				_game.transitions.splice(i, 1);
			}
		}

		var allObjects = _game.workspace.concat(_game.hud);
		for (var i = 0; i < allObjects.length; i++) {
			if (allObjects[i].update) {
				allObjects[i].update();
			}
		}

		if (canvas) {
			render();
		}
		if (canRun) {
			requestAnimationFrame(update);
		}
	};
	function render() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		ctx.save();
		ctx.translate(_game.camera.x, _game.camera.y);
		for (var i = 0; i < _game.workspace.length; i++) {
			ctx.save();
			renderObject(_game.workspace[i]);
			ctx.restore();
		}
		//ctx.translate(-1, 0);
		ctx.restore();
		for (var i = 0; i < _game.hud.length; i++) {
			ctx.save();
			renderObject(_game.hud[i]);
			ctx.restore();
		}
	}

	this.setStage = function(canv, w, h) {
		canvas = document.querySelector(canv);
		canvas.width = w;
		canvas.height = h;
		ctx = canvas.getContext("2d");
	};
	this.start = function() {
		canRun = true;
		console.info("MobSin - Game started.");
		update();
	};
	this.pause = function() {
		console.info("MobSin - Game paused.");
		canRun = false;
	}
	function setPresets(that, presets) {
		if (presets) {
			for (var i = 0; i < Object.keys(presets).length; i++) {
				//console.log(Object.values(presets)[i]);
				that[Object.keys(presets)[i]] = Object.values(presets)[i];
			}
		}
	}
	function generateId() {
		return Math.random().toString(36).slice(6);
	}
	function renderObject(obj) {
		switch (obj._type) {
			case "block":
				ctx.fillStyle = obj.colour;
				ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
				break;
			case "textScreen":
				ctx.fillStyle = obj.colour;
				ctx.font = obj.size + "px " + obj.font;
				ctx.fillText(obj.text, obj.x, obj.y);
				break;
		}
	}
	this.objects = {
		block: function(presets) {
			this._id = generateId();
			this._type = "block";
			this.x = this.y = this.w = this.h = 0;
			this.colour = "#000";
			this.data = {};
			setPresets(this, presets);

			this.instance = function(where) {
				_game[where].push(this);
			};
		},
		textScreen: function(presets) {
			this._id = generateId();
			this._type = "textScreen";
			this.x = this.y = 0;
			this.colour = "#000";
			this.text = "Sample Text";
			this.size = 12;
			this.font = "Arial";
			this.data = {};
			setPresets(this, presets);

			this.instance = function() {
				_game.hud.push(this);
			};
		}
	};
	this.func = {
		getId: function(obj) { // Get ID of an object - Takes an object.
			return obj._id;
		},
		findObj: function(id) {
			var allObjects = _game.workspace.concat(_game.hud);
			return allObjects.find(function(e) {
				return e._id == id;
			});
		},
		getAllObjs: function() {
			return _game.workspace.concat(_game.hud);
		},
		destroy: function(thing) { // Delete an object - Takes an ID or object.
			var delId;
			if (typeof thing == "object") {
				delId = _game.func.getId(thing);
			} else if (typeof thing == "string") {
				delId = thing;
			}
			_game.workspace = _game.workspace.filter(function(e) {
				return e._id == delId ? false : true;
			});
			_game.hud = _game.hud.filter(function(e) {
				return e._id == delId ? false : true;
			});
		},
		waitC: function(time, callback) {
			setTimeout(callback, time * 1000);
		},
		rand: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		dist: function(x1, y1, x2, y2) {
			var a = x1 - x2;
			var b = y1 - y2;
			return Math.sqrt(a * a + b * b);
		}
	};
	this.camera = {
		x: 0,
		y: 0
	};
	function transitionLinear(obj, property, time, from, to, callback) {
		this.start = from;
		this.callback = callback;
		this.canKill = false;

		var startTime = performance.now();
		var endTime = (startTime + time * 1000);

		this.update = function() {
			var through = (performance.now() - startTime) / endTime;
			if (through <= 1) {
				//console.log(from + ((to - from) * through));
				obj[property] = from + ((to - from) * through);
			} else {
				obj[property] = to;
				this.canKill = true;
				this.callback();
			}
		};
	}
	this.transitions = [];
	this.anim = {
		transitionLinear: function(obj, property, time, from, to, callback = function() {}) {
			_game.transitions.push(new transitionLinear(obj, property, time, from, to, callback));
		}
	};
	this.workspace = [];
	this.hud = [];
}