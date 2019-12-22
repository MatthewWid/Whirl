const Renderer = require("../Renderer.js");

class CanvasRenderer extends Renderer {
	contextType = "2d";

	render(ctx, viewport, objects) {}

	Sprite(ctx, viewport, Sprite) {}
}

module.exports = CanvasRenderer;
