const Renderer = require("./Renderer.js");

class Webgl extends Renderer {
	contextType = "webgl";

	render(ctx, viewport, objects) {}
}

module.exports = Webgl;
