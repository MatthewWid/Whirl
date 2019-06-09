// Whirl.Sprite.Circle.render

const renderTypes = {
	image: require("./image"),
	colour: require("./colour")
};

// Render this sprite given a canvas context, offset coordinates and scaling
function render(_ctx, offset = {}) {
	_ctx.save();

	if (this.alpha != 0 && this.scale != 0 || (this._fill.type == "colour" && this._fill.data != "transparent")) { // Don't render if we won't see it anyway
		if (this.alpha != 1) {
			_ctx.globalAlpha = this.alpha;
		}

		renderTypes[this._fill.type](_ctx, this);
	}

	_ctx.restore();
}

module.exports = render;
