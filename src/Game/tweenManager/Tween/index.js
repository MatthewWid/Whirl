// MobSin.game.tweenManager.Tween

let linearTweenFunction = require("../../../tweens/linear");

/*
	A tween is an instruction to modify a given object by
	shifting a property between a given start and end point over a given period of time.

	Presets can be:
	- easing
	- start
	- roundValues
*/
function Tween(_game, _obj, from = {}, to, time, presets = {}) {
	_game.object.init(this, "MobSin.Tween", {event: true});

	this.object = _obj;
	// The easing function used for this tween
	// See 'MobSin.tweens'
	// If no easing function is given then a linear tween will be defaulted to
	this._easing = presets.easing || linearTweenFunction;

	// TODO: 
	// If 'from' is not given any values but 'to' is
	// then assume they want to go from its current position
	// *to* an offset from its 'from' position.
	// Otherwise if both 'from' and 'to' are given simply
	// move between the two absolute values.
	this.from = {...from};
	this.to = {...to};

	// Whether the values being modified should be rounded to an integer
	this.roundValues = presets.roundValues || false;

	// Whether the tween is allowed to update
	this.canRun = presets.hasOwnProperty("start") ? presets.start : true;

	/*
		TODO:
		If start() is called again then restart the tween from the beginning
	*/
	this.start = () => {
		this.startTime = Date.now();
		this.endTime = this.startTime + time;

		this.finished = false;

		this.canRun = true;
		this.event.emit("willStart");

		return this;
	};
	/*
		TODO:
		When the tween stops then round the currently modified values
		presets.roundLast
	*/
	this.stop = () => {
		this.canRun = false;
		this.event.emit("willStop");

		return this;
	};
	if (this.canRun) {
		this.start();
	}

	// Chain or unchain another tween to this tween
	// A chained tween is started when the current tween ends
	this.chainedTween = null;
	this.chain = (tween) => {
		this.chainedTween = tween;

		return tween;
	};
	this.unchain = () => {
		this.chainedTween = null;
	};

	// Update this tween each loop
	this._update = () => {
		if (this.canRun) {
			let now = Date.now();
			let through = (now - this.startTime) / (this.endTime - this.startTime);

			// If the tween has finished then stop the tween and call its chained tween, if any
			if (through >= 1) {
				this.stop();
				this.event.emit("didFinish");

				this.finished = true;

				if (this.chainedTween) {
					this.chainedTween.start();
				}

				return;
			}

			// Iterate through each property to modify
			let toKeys = Object.keys(to);
			for (let i = 0; i < toKeys.length; i++) {
				// Move it between the two values using the tween's easing function
				this.object[toKeys[i]] = this.from[toKeys[i]] + (this.to[toKeys[i]] - this.from[toKeys[i]]) * this._easing(through);
				if (this.roundValues) {
					this.object[toKeys[i]] = Math.round(this.object[toKeys[i]]);
				}
			}

			this.event.emit("didUpdate", {
				through: through,
				now: now
			});
		}
	};
}

module.exports = Tween;