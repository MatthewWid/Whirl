const Renderer = require("../Renderer.js");

class WebglRenderer extends Renderer {
	contextType = "webgl";

	render(ctx, viewport, objects) {}
}

module.exports = WebglRenderer;
