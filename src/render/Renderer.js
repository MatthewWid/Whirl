/**
 * @classdesc
 * Abstracts over a system for rendering. Eg, Canvas, WebGL or other rendering libraries such as PixiJS.
 *
 * Whirl ships with a 2D Canvas renderer or a WebGL renderer, but you can provide your own custom renderer that wraps your own custom rendering logic or other third-party libraries such as PixiJS, Paper.js, p5, etc.
 *
 * This makes Whirl extremely customisable and versatile by affording the user complete control of the render system if they so choose to use it. You could even abstract rendering logic into more complex graphical libraries such as ThreeJS to achieve exactly the effect you need in your application or web page.
 *
 * @class Renderer
 * @memberof Whirl.render
 * @abstract
 *
 * @example
 * const {render: {Renderer}} = Whirl;
 *
 * class MyRenderer extends Renderer {
 * 	getContext() {}
 *
 * 	render() {}
 *
 * 	...
 * }
 */
class Renderer {
	/**
	 * The game instance this renderer belongs to.
	 *
	 * @memberof Whirl.render.Renderer#
	 * @type {Whirl.Game}
	 * @readonly
	 */
	_game;

	constructor(game) {
		this._game = game;
	}

	/**
	 * Process and retrieve a context object to be used for rendering by a viewport.
	 *
	 * @method Whirl.render.Renderer#getContext
	 *
	 * @abstract
	 * @param {HTMLElement} canvas Reference to the canvas element to render to.
	 * @returns {RenderingContext} Canvas context to be used for rendering - Eg, {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D|CanvasRenderingContext2D}, {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext|WebGLRenderingContext}, etc.
	 */
	getContext(canvas) {}

	/**
	 * Render method that renders to a given context with the effects of a given viewport.
	 *
	 * @method Whirl.render.Renderer#render
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
	 * @method Whirl.render.Renderer#Sprite
	 *
	 * @abstract
	 * @param {any} ctx Rendering context to draw to.
	 * @param {Whirl.Viewport} viewport Viewport to use post-processing effects from.
	 * @param {Whirl.Entity} Sprite Sprite object to render.
	 */
	Sprite(ctx, viewport, Sprite) {}
}

module.exports = Renderer;
