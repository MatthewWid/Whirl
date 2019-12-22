const Renderer = require("../Renderer.js");

/**
 * @classdesc
 * Wraps rendering logic for 2D Canvas rendering.
 *
 * @class CanvasRenderer
 * @memberof Whirl
 * @extends Whirl.Renderer
 *
 * @example
 * const game = Whirl.Game({
 * 	renderer: Whirl.CanvasRenderer
 * });
 */
class CanvasRenderer extends Renderer {
	contextType = "2d";

	render(ctx, viewport, objects) {}

	Sprite(ctx, viewport, Sprite) {}
}

module.exports = CanvasRenderer;
