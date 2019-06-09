// Whirl.Sprite.Rectangle.update

// Update screen position, physics, event handlers, etc.
function update(offset = {}) {
	this._screenBounds.set({
		x: Math.round(this.bounds.x - this.bounds.w * this.anchor.x * this.scale) + (offset.x || 0),
		y: Math.round(this.bounds.y - this.bounds.h * this.anchor.y * this.scale) + (offset.y || 0),
		w: this.bounds.w * this.scale,
		h: this.bounds.h * this.scale
	});
}

module.exports = update;
