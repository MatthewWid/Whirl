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
	game;

	constructor(game) {
		this.game = game;
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
	 * @param {string} [canvasSelector={@link Whirl.Game.ConfigManager#canvas|ConfigManager 'canvas' property}] Selector for an [HTML \<canvas\> element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) to render to.
	 * @returns {Whirl.render.Renderer~RenderContext} Canvas context to be used for rendering - Eg, {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D|CanvasRenderingContext2D}, {@link https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext|WebGLRenderingContext}, etc.
	 */
	getContext(selector) {}

	/**
	 * Runs just before the first Viewport begins its individual rendering.
	 *
	 * Perform global setup and canvas preparation.
	 *
	 * @method Whirl.render.Renderer#preRenderAll
	 *
	 * @abstract
	 * @param {Whirl.Viewport[]} viewports All Viewports to be rendered.
	 */
	preRenderAll(viewports) {}

	/**
	 * Runs after the last Viewport finishes its individual rendering.
	 *
	 * Perform cleanup, batch clipping and globally applied post-processing effects.
	 *
	 * @method Whirl.render.Renderer#postRenderAll
	 *
	 * @abstract
	 * @param {Whirl.Viewport[]} viewports All Viewports that were rendered.
	 */
	postRenderAll(viewports) {}

	/**
	 * Runs just before renderable items of a single Viewport are drawn to the screen.
	 *
	 * Perform set up for a given frame to render such as transforms and background effects.
	 *
	 * @method Whirl.render.Renderer#preRenderViewport
	 *
	 * @abstract
	 * @param {Whirl.Viewport} viewport Current viewport being rendered.
	 */
	preRenderViewport(viewport, renderables) {}

	/**
	 * Runs just after the renderable items of a single Viewport are drawn to the screen.
	 *
	 * Perform post-processing effects and any cleanup necessary for post-rendering the given viewport.
	 *
	 * @method Whirl.render.Renderer#postRenderViewport
	 *
	 * @abstract
	 * @param {Whirl.Viewport} viewport Current viewport being rendered.
	 */
	postRenderViewport(viewport, renderables) {}

	/**
	 * Render an individual Sprite.
	 *
	 * @method Whirl.render.Renderer#Sprite
	 *
	 * @abstract
	 * @param {Whirl.Viewport} viewport Viewport to use post-processing effects from.
	 * @param {Whirl.Sprite} sprite Sprite object to render.
	 */
	Sprite(viewport, sprite) {}
}

module.exports = Renderer;
