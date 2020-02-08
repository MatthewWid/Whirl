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
	getContext = (canvas) => {
		const canvasElement = document.querySelector(canvas || this.game.config.get("canvas"));

		if (!canvasElement) {
			this.game.debug.error("Cannot find the given canvas element to render to.", "WebglRenderer");

			return {};
		}

		const canvasContext = canvasElement.getContext("experimental-webgl");

		return {
			canvas: canvasElement,
			ctx: canvasContext,
		};
	};
}

module.exports = WebglRenderer;
