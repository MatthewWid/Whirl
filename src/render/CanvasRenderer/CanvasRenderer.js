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
	getContext = (canvas) => canvas.getContext("2d");

	render(ctx, viewport, objects) {}
}

module.exports = CanvasRenderer;
