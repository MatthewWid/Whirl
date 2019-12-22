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
 * 	renderer: Whirl.render.Webgl
 * });
 */
class WebglRenderer extends Renderer {
	getContext = (canvas) => canvas.getContext("experimental-webgl");

	render(ctx, viewport, objects) {}
}

module.exports = WebglRenderer;
