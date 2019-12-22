const Renderer = require("../Renderer.js");

/**
 * @classdesc
 * Wraps rendering logic for 2D Canvas rendering.
 *
 * @class Canvas
 * @memberof Whirl.render
 * @extends Whirl.render.Renderer
 *
 * @example
 * const game = Whirl.Game({
 * 	renderer: Whirl.render.CanvasRenderer
 * });
 */
class CanvasRenderer extends Renderer {
	contextType = "2d";

	render(ctx, viewport, objects) {}

	Sprite(ctx, viewport, Sprite) {}
}

module.exports = CanvasRenderer;
