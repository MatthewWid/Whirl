/**
 * @classdesc
 * Abstracts over a system for rendering. Eg, Canvas, WebGL or rendering libraries such as PixiJS.
 *
 * @class Renderer
 * @memberof Whirl
 * @ignore
 */
class Renderer {
	_game;

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
}

module.exports = Renderer;
