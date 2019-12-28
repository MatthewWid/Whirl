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
	 * Contextual information relevant to rendering a single screen or viewport.
	 *
	 * During the rendering process, the currently plugged in render system ({@link Whirl.render.Canvas|Canvas} by default) be provided with this object from each viewport to know which canvas to render to and how to render onto it.
	 *
	 * Render systems can also add extra properties to this object that may hold additional necessary data for rendering with different systems or engines.
	 *
	 * @typedef {object} Whirl.render.Renderer~RenderContext
	 * @property {Element} canvas Reference to the [canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) that this viewport will render to.
	 * @property {RenderingContext} ctx Reference to the [2D rendering context of the canvas](https://developer.mozilla.org/en-US/docs/Web/API/RenderingContext) currently being used.
	 */

	/**
	 * Process and generate a rendering context object needed to render
	 *
	 * @method Whirl.render.Renderer#getContext
	 *
	 * @abstract
	 * @param {string} [canvas={@link Whirl.Game.ConfigManager#canvas|ConfigManager 'canvas' property}] Selector for an [HTML \<canvas\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) to render to.
	 * @returns {Whirl.render.Renderer~RenderContext} Canvas context to be used for rendering - Eg, {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D|CanvasRenderingContext2D}, {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext|WebGLRenderingContext}, etc.
	 */
	getContext(canvas) {}

	/**
	 * Render a single viewport to the screen.
	 *
	 * @method Whirl.render.Renderer#render
	 *
	 * @abstract
	 * @param {Whirl.Viewport} viewport Viewport to retrieve children from and apply post-processing effects with.
	 */
	render(viewport) {}

	/**
	 * Render an individual Sprite.
	 *
	 * @method Whirl.render.Renderer#Sprite
	 *
	 * @abstract
	 * @param {Whirl.Viewport} viewport Viewport to use post-processing effects from.
	 * @param {Whirl.Sprite} Sprite Sprite object to render.
	 */
	Sprite(viewport, sprite) {}
}

module.exports = Renderer;
