const Renderer = require("../Renderer.js");

/**
 * @classdesc
 * Wraps rendering logic for WebGL rendering.
 *
 * @class WebglRenderer
 * @memberof Whirl
 * @extends Whirl.Renderer
 *
 * @example
 * const game = Whirl.Game({
 * 	renderer: Whirl.WebglRenderer
 * });
 */
class WebglRenderer extends Renderer {
	contextType = "webgl";

	render(ctx, viewport, objects) {}
}

module.exports = WebglRenderer;
