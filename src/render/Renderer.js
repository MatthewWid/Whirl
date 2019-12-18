/**
 * @classdesc
 * Abstracts over a system for rendering. Eg, Canvas, WebGL or rendering libraries such as PixiJS.
 *
 * @class Renderer
 * @memberof Whirl
 */
class Renderer {
	/**
	 * The game instance this renderer belongs to.
	 *
	 * @memberof Whirl.Renderer#
	 * @type {Whirl.Game}
	 * @readonly
	 */
	_game;

	/**
	 * Context identifier string from which to fetch from the canvas element.
	 *
	 * @abstract
	 * @memberof Whirl.Renderer#
	 * @type {string("2d", "webgl", "webgl2", "bitmaprenderer")}
	 * @readonly
	 */
	contextType;

	constructor(game) {
		this._game = game;
	}

	/**
	 * Render method that renders to a given context with the effects of a given viewport.
	 *
	 * @abstract
	 * @param {any} ctx Rendering context to draw to.
	 * @param {Whirl.Viewport} viewport Viewport to use post-processing effects from.
	 * @param {Whirl.Entity[]} objects Sorted list of objects to render.
	 */
	render(ctx, viewport, objects) {}

	/**
	 * Render a given Sprite.
	 *
	 * @abstract
	 * @param {any} ctx Rendering context to draw to.
	 * @param {Whirl.Viewport} viewport Viewport to use post-processing effects from.
	 * @param {Whirl.Entity} Sprite Sprite object to render.
	 */
	Sprite(ctx, viewport, Sprite) {}
}

module.exports = Renderer;
