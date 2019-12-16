const Base = require("../Base/");
const {Rectangle, Point} = require("../../shapes/");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * A viewport is the view into your game world. It is responsible for rendering a stage to a canvas.
 *
 * Viewports can be scrolled around your world, have various camera effects and filters applied, zoomed in and out and other such visual effects that you may need in your game.
 *
 * A viewport is defined by a clipping plane and a scroll value. The clipping plane's `x` and `y` values move the rendered view around the canvas and its `w` and `h` values define the width and height. Anything rendered outside of the clipping plane is *clipped* and will be cut off/not rendered at all.
 *
 * A viewport can be scrolled about the game world by modifying its `scroll` value. This moves where viewports camera is relative to the game world, but will keep it in the same place relative to the canvas.
 *
 * Viewports should be instantiated using the `Whirl.Viewport` factory method, but the underlying class can be accessed with `Whirl.Viewport._class`.
 *
 * @class Viewport
 * @memberof Whirl
 * @extends Whirl.Base
 *
 * @param {Whirl.Game} game Game instance this viewport belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 * @param {Whirl.shapes.Rectangle} options.bounds Set the bounds of the clipping plane. Alternatively, give each dimension of the clipping plane manually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect this viewports bounds in response.
 * @param {number} options.x=0 X-coordinate of the clipping plane relative to the screen.
 * @param {number} options.y=0 Y-coordinate of the clipping plane relative to the screen.
 * @param {number} options.w=0 Width of the clipping plane.
 * @param {number} options.h=0 Height of the clipping plane.
 * @param {Whirl.shapes.Point} options.scroll Set the initial scroll value around the world. Alternatively, give each scroll value individually with the `scrollX` and `scrollY` options.
 * @param {number} options.scrollX=0 X-coordinate of the scroll position.
 * @param {number} options.scrollY=0 Y-coordinate of the scroll position.
 * @param {boolean} options.clip=true Remove all pixels that are outside of the clipping plane from the rendered output on the canvas.
 * @param {boolean} options.imageSmoothing=true Canvas anti-aliasing.
 * @param {number} options.zoom=1 Initial zoom level. Increasing this value zooms in, decreasing it zooms out.
 * @param {number} options.lerp=1 Linear interpolation value to use when animatedly scrolling to a given point or game object.
 * @param {string} options.canvas Selector for the canvas element to render to. If not given, will default to the `canvas` value stored in {@link Whirl.Game.ConfigManager|the game configuration}.
 * @param {boolean} options.resize=false Resize the canvas width and height to the width and height of this viewports clipping plane.
 *
 * @example
 * const viewport = Whirl.Viewport(game, {
 * 	w: 500,
 * 	h: 500,
 * 	resize: true
 * });
 */
class Viewport extends Base {
	/**
	 * Reference to the canvas that this viewport will render to.
	 *
	 * Do not modify this property directly. Instead, use the `setCanvas` method.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {HTMLElement}
	 * @readonly
	 */
	_canvas;

	/**
	 * Reference to the 2D rendering context of the canvas to render to.
	 *
	 * Do not modify this property directly. Instead, use the `setCanvas` method.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {CanvasRenderingContext2D}
	 * @readonly
	 */
	_ctx;

	/**
	 * Bounds of the clipping plane denoted by an X and Y coordinate and a width and height.
	 *
	 * The `x` and `y` coordinates define the top-left-most point of the clipping plane and will shift the rendered output of the canvas by an offset of these two values.
	 *
	 * Pixels rendered outside of the viewport's clipping plane (this value) will be cleared, assuming this viewport's `clip` property is set to `true`. If the `clip` property is set to `false` then the width and height of the clipping plane will have no effect.
	 *
	 * Defaults to position `(0, 0)` and dimensions `0x0`.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.shapes.Rectangle}
	 */
	bounds;

	/**
	 * Defines the position of where this viewport is scrolled to relative to the world.
	 *
	 * When this value changes the viewport will not be moved around the canvas, but the world remove relative to the viewport.
	 *
	 * Defaults to `(0, 0)`.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.shapes.Point}
	 */
	scroll;

	/**
	 * Remove all pixels that are outside of the clipping plane from the rendered output on the canvas.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {boolean}
	 * @default true
	 */
	clip;

	/**
	 * Enable anti-aliasing when rendering.
	 *
	 * For games that make use of pixel art or require precise rendering this should be disabled.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {boolean}
	 * @default true
	 */
	imageSmoothing;

	/**
	 * Adjust the zoom level of this viewport camera.
	 *
	 * Larger values are more zoomed in, smaller values are zoomed out.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {number}
	 * @default 1
	 */
	zoom;

	/**
	 * Linear interpolation value used when animatedly scrolling to a given point or game object.
	 *
	 * When this viewport's camera is locked to an object in the world and the object moves, lowering this value will cause it to follow the object smoothly instead of locking onto its exact position at all times.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {number}
	 * @default 1
	 */
	lerp;

	constructor(game, options = {}) {
		super(game);

		if (options.bounds instanceof Rectangle._class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(options.x || 0, options.y || 0, options.w || 0, options.h || 0);
		}

		if (options.scroll instanceof Point._class) {
			this.scroll = options.scroll;
		} else {
			this.scroll = Point(options.scrollX || 0, options.scrollY || 0);
		}

		this.clip = getValue(options, "clip", true);

		this.imageSmoothing = getValue(options, "imageSmoothing", true);

		this.zoom = getValue(options, "zoom", 1);

		this.lerp = getValue(options, "lerp", 1);

		this.setCanvas(options.canvas, options.resize);
	}

	/**
	 * Set the canvas element to render to.
	 *
	 * If changing from one canvas to the another, the previous canvas pixels will not be cleared before switching to the other canvas.
	 *
	 * @method Whirl.Viewport#setCanvas
	 *
	 * @param {string} [selector] Selector for the canvas element. Defaults to the canvas element defined by the `canvas` in the {@link Whirl.Game.ConfigManager|global game configuration}.
	 * @param {boolean} [resize=false] Resize the canvas width and height to the width and height of this viewport's clipping plane.
	 * @returns {this}
	 *
	 * @example
	 * viewport.setCanvas("#myDifferentCanvas", true);
	 */
	setCanvas(selector = this._game.config.get("canvas"), resize = false) {
		const canvas = document.querySelector(selector);

		if (!canvas) {
			this._game.debug.error("Cannot find the given canvas element to render to.", "Viewport");

			return this;
		}

		if (resize) {
			canvas.width = this.bounds.w;
			canvas.height = this.bounds.h;
		}

		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");

		return this;
	}

	/**
	 * Scroll to a specified position.
	 *
	 * This method ignores the viewport's `lerp` value and will appear to immediately teleport to the position given.
	 *
	 * Has no effect if this viewport is locked to an object in the game world.
	 *
	 * @method Whirl.Viewport#scrollTo
	 *
	 * @param {number|Whirl.shapes.Point} px X-position of the point to scroll to. An instance of a Point object can be given instead to scroll to the position with the same coordinates as the Point object.
	 * @param {number} [py] Y-coordinate of the point to scroll to.
	 * @returns {this}
	 *
	 * @example
	 * viewport.scrollTo(50, 75);
	 *
	 * @example
	 * viewport.scrollTo(
	 * 	Whirl.shapes.Point(50, 75)
	 * );
	 */
	scrollTo(px, py) {
		let x = px;
		let y = py;

		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		this.scroll.x = x;
		this.scroll.y = y;

		return this;
	}
}

module.exports = (...args) => new Viewport(...args);
module.exports._class = Viewport;
