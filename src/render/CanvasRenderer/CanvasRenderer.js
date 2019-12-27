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
 * 	renderer: Whirl.render.Canvas
 * });
 */
class CanvasRenderer extends Renderer {
	getContext = (canvas) => {
		const canvasElement = document.querySelector(canvas || this._game.config.get("canvas"));

		if (!canvasElement) {
			this._game.debug.error(
				"Cannot find the given canvas element to render to.",
				"CanvasRenderer"
			);

			return {};
		}

		const canvasContext = canvasElement.getContext("2d");

		return {
			canvas: canvasElement,
			ctx: canvasContext,
		};
	};

	render(ctx, viewport, objects) {}
}

module.exports = CanvasRenderer;
