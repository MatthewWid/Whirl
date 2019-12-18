const Renderer = require("./Renderer.js");

class Canvas extends Renderer {
	contextType = "2d";

	render(ctx, viewport, objects) {}

	Sprite(ctx, viewport, Sprite) {}
}

module.exports = Canvas;
