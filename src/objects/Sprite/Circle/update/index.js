// Whirl.Sprite.Circle.update

// Update screen position, physics, event handlers, etc.
function update(offset = {}) {
	this._screenBounds.set({
		x: this.bounds.x + (offset.x || 0),
		y: this.bounds.y + (offset.y || 0),
		r: this.bounds.r * this.scale
	});
}

module.exports = update;
