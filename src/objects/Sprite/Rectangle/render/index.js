// Whirl.this.Rectangle.render

const renderTypes = {
	image: require("./image"),
	colour: require("./colour")
};

// Render this sprite given a canvas context, offset coordinates and scaling
function render(ctx) {
	ctx.save();

	if (this.alpha != 0 && this.scale != 0 || (this._fill.type == "colour" && this._fill.data != "transparent")) { // Don't render if we won't see it anyway
		if (this.alpha != 1) {
			ctx.globalAlpha = this.alpha;
		}

		renderTypes[this._fill.type](ctx, this);
	}

	if (this.outline) {
		ctx.globalAlpha = 1;

		ctx.lineWidth = 2;
		ctx.strokeStyle = this.outline;
		ctx.strokeRect(this._screenBounds.x - 1, this._screenBounds.y - 1, this._screenBounds.w + 2, this._screenBounds.h + 2);
	}

	ctx.restore();
};

module.exports = render;
