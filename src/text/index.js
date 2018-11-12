// MobSin.Text

/*
	A text object used to render text in the world.
	Text is not bound or affected by physics or world boundaries.

	Presets can be:
	- x
	- y
	- size
	- font
	- fill
*/
function Text(_game, content, presets = {}) {
	_game.object.init(this, "MobSin.Text", {tween: true});

	// The actual text of this text object
	this.content = content || "";

	// The X and Y position. Text has no inherent width and height limit
	this.pos = {
		x: presets.x || 0,
		y: presets.y || 0
	};

	// Text size, defaulted to 12 pixels
	this.size = presets.size || 12;
	// Text font, defaulted to Arial
	this.font = presets.font || "Arial";
	
	// Text fill, defaulted to black
	this.fill = presets.fill || "#000";

	this._update = () => {};
	this._render = (_ctx, offsets = {}) => {
		_ctx.save();

		_ctx.font = `${this.size}px ${this.font}`;
		_ctx.fillStyle = this.fill;
		_ctx.fillText(this.content, this.pos.x, this.pos.y);

		_ctx.restore();
	};
}

module.exports = (_game, content, presets) => new Text(_game, content, presets);