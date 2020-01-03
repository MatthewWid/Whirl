const Renderer = require("../Renderer.js");
const Colour = require("../../objects/Colour/");
const Gradient = require("../../objects/Gradient/");
const radians = require("../../math/radians");

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
	getContext = (selector) => {
		const canvas = document.querySelector(selector || this._game.config.get("canvas"));

		if (!canvas) {
			this._game.debug.error(
				"Cannot find the given canvas element to render to.",
				"CanvasRenderer"
			);

			return {};
		}

		const canvasContext = canvas.getContext("2d");

		return {
			canvas: canvas,
			ctx: canvasContext,
		};
	};

	preRender(viewport) {
		const {canvas, ctx} = viewport.render;

		ctx.save();

		ctx.translate(viewport.bounds.x, viewport.bounds.y);

		if (viewport.clear) {
			ctx.clearRect(0, 0, viewport.bounds.w, viewport.bounds.h);
		}
	}

	postRender(viewport) {
		const {canvas, ctx} = viewport.render;

		if (viewport.clip) {
			ctx.globalCompositeOperation = "destination-in";
			ctx.fillRect(0, 0, viewport.bounds.w, viewport.bounds.h);
		}

		ctx.restore();
	}

	Sprite(viewport, sprite) {
		const {canvas, ctx} = viewport.render;

		ctx.save();

		ctx.globalAlpha = sprite.derived.alpha;

		ctx.translate(sprite.derived.bounds.x, sprite.derived.bounds.y);

		if (sprite.rotation) {
			const rotationOriginX = sprite.derived.bounds.w * sprite.anchor.x;
			const rotationOriginY = sprite.derived.bounds.h * sprite.anchor.y;

			ctx.translate(rotationOriginX, rotationOriginY);

			ctx.rotate(radians(sprite.rotation));

			ctx.translate(-rotationOriginX, -rotationOriginY);
		}

		if (sprite.fill instanceof Colour) {
			ctx.fillStyle = sprite.fill._data;

			ctx.fillRect(0, 0, sprite.derived.bounds.w, sprite.derived.bounds.h);
		} else if (sprite.fill instanceof Gradient) {
			const gradient = ctx.createLinearGradient(
				(sprite.fill.start.x / 100) * sprite.derived.bounds.w,
				(sprite.fill.start.y / 100) * sprite.derived.bounds.h,
				(sprite.fill.end.x / 100) * sprite.derived.bounds.w,
				(sprite.fill.end.y / 100) * sprite.derived.bounds.h
			);

			for (let i = 0; i < sprite.fill.stops.length; i++) {
				const [offset, colour] = sprite.fill.stops[i];

				gradient.addColorStop(offset, colour._data);
			}

			ctx.fillStyle = gradient;

			ctx.fillRect(0, 0, sprite.derived.bounds.w, sprite.derived.bounds.h);
		}

		ctx.restore();
	}
}

module.exports = CanvasRenderer;
