// MobSin.game.tweenManager.Tween

// A tween is an instruction to modify a given object by
// shifting a property between a given start and end point over a given period of time.
function Tween(_game, _obj, from = {}, to, time, presets = {}) {
	_game.object.init(this, "MobSin.Tween", {event: true});

	this.object = _obj;

	// TODO: 
	// If 'from' is not given any values but 'to' is
	// then assume they want to go from its current position
	// *to* an offset from its 'from' position.
	// Otherwise if both 'from' and 'to' are given simply
	// move between the two absolute values.
	this.from = {...from};
	this.to = {...to};

	this.start = Date.now();
	this.end = this.start + time;

	this._update = () => {
		// Update the objects properties using the current time compared to the start and end time.
	};
}

module.exports = Tween;