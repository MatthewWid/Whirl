const Renderer = require("../Renderer.js");

/**
 * @classdesc
 * Wraps rendering logic for WebGL rendering.
 *
 * @class Webgl
 * @memberof Whirl.render
 * @extends Whirl.render.Renderer
 *
 * @example
 * const game = Whirl.Game({
 * 	renderer: Whirl.render.WebglRenderer
 * });
 */
class WebglRenderer extends Renderer {
	contextType = "webgl";

	render(ctx, viewport, objects) {}
}

module.exports = WebglRenderer;
