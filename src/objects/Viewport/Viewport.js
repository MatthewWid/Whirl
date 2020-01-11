const Base = require("../Base/");
const Stage = require("../Stage/");
const Camera = require("../Camera/");
const Entity = require("../Entity/");
const Sprite = require("../Sprite/");
const {Rectangle, Point} = require("../../geometry/");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * Viewports render the game world onto a section of your screen using a {@link Whirl.Camera|Camera} and {@link Whirl.Stage|Stage}.
 *
 * A viewport is defined by a rectangular clipping plane. The clipping plane `x` and `y` values move the rendered view around the 2D screen space, and its `w` and `h` values define size of the viewport. By default, anything rendered outside of the clipping plane is *clipped* and will be cut off and on the output image.
 *
 * Think of a Viewport as looking at what is on your screen, and a Camera as what is in your world. The Camera understands what we can see in the world and where, and the Viewport actually translates it onto the screen.
 *
 * @class Viewport
 * @memberof Whirl
 * @extends Whirl.Base
 *
 * @param {Whirl.Game} game Game instance this viewport belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 *
 * Either provide the bounds with a {@link Whirl.geometry.Rectangle|Rectangle} instance, or give each value individually with `x`, `y`, `w` and `h`.
 *
 * Either provide the scroll position with a {@link Whirl.geometry.Point|Point} instance, or give each value individually with `scrollX` and `scrollY`.
 * @param {Whirl.geometry.Rectangle} options.bounds Set the bounds of the clipping plane. Alternatively, give each dimension of the clipping plane manually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect this viewports bounds in response.
 * @param {number} options.x=0 X-coordinate of the clipping plane relative to the screen.
 * @param {number} options.y=0 Y-coordinate of the clipping plane relative to the screen.
 * @param {number} options.w=ConfigManager.w Width of the clipping plane.
 * @param {number} options.h=ConfigManager.h Height of the clipping plane.
 * @param {Whirl.geometry.Point} options.scroll Set the initial scroll value around the world. Alternatively, give each scroll value individually with the `scrollX` and `scrollY` options.
 * @param {number} options.scrollX=0 X-coordinate of the scroll position.
 * @param {number} options.scrollY=0 Y-coordinate of the scroll position.
 * @param {number} options.anchorX=0 X-coordinate of the anchor point (0-1).
 * @param {number} options.anchorY=0 Y-coordinate of this sprite's anchor point (0-1).
 * @param {boolean} options.clip=false Remove all pixels that are outside of the clipping plane from the rendered output on the canvas.
 * @param {boolean} options.clear=true Clear the area being rendered to before each render tick.
 * @param {boolean} options.imageSmoothing=true Canvas anti-aliasing.
 * @param {number} options.zoom=1 Initial zoom level. Increasing this value zooms in, decreasing it zooms out.
 * @param {number} options.lerp=1 Linear interpolation value to use when animatedly scrolling to a given point or game object.
 * @param {Whirl.geometry.Point|Whirl.Entity} options.target=null Target Point or Entity to follow.
 * @param {string} options.canvas Selector for the canvas element to render to. If not given, will default to the `canvas` value stored in {@link Whirl.Game.ConfigManager#canvas|the game configuration}.
 *
 * Implicitely calls the {@link Whirl.Viewport#setCanvas|`setCanvas`} method.
 * @param {boolean} options.resizeCanvas=false Resize the canvas width and height to the same width and height of this viewports clipping plane.
 * @param {Whirl.Stage} options.stage Initial stage to be rendered by this Viewport.
 *
 * Implicitely calls the {@link Whirl.Viewport#setCanvas|`setCanvas`} method.
 * @param {boolean} options.resizeStage=false Resize the stage bounds to the same position and dimensions of this viewport.
 * @param {Whirl.Camera} options.camera Initial camera to be used for rendering.
 *
 * Implicitely calls the {@link Whirl.Viewport#setCamera|`setCamera`} method.
 *
 * @example
 * game.Viewport({
 * 	w: 500,
 * 	h: 500,
 * 	resize: true
 * });
 * // or
 * Whirl.Viewport(game, {
 * 	w: 500,
 * 	h: 500,
 * 	resize: true
 * });
 */
class Viewport extends Base {
	/**
	 * Holds contextual information relevant to rendering this individual viewport.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.render.Renderer~RenderContext}
	 * @readonly
	 */
	render;

	/**
	 * Reference to the Stage used for rendering.
	 *
	 * Do not modify this property directly. Instead, use the `setStage` method.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.Stage}
	 * @readonly
	 * @default null
	 */
	stage = null;

	/**
	 * Reference to the active Camera used for rendering.
	 *
	 * Do not modify this property directly. Instead ,use the `setCamera` method.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.Camera}
	 * @readonly
	 * @default null
	 */
	camera = null;

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
	 * @type {Whirl.geometry.Rectangle}
	 */
	bounds;

	/**
	 * Defines the position of where this viewport is scrolled relative to the world.
	 *
	 * When this value changes the viewport will not be moved around the canvas, but the world remove relative to the viewport.
	 *
	 * Defaults to `(0, 0)`.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.geometry.Point}
	 */
	scroll;

	/**
	 * Anchor/Origin point of the camera.
	 *
	 * Should be between `0` and `1` as a percentage through the bounds of the viewport where `(0, 0)` is the top-left-most point, and `(1, 1)` is the bottom-right-most point.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.geometry.Point}
	 * @default (0, 0)
	 */
	anchor;

	/**
	 * Remove all pixels that are outside of the clipping plane from the rendered output on the canvas. Cuts off everything that appears outside of the Viewport in the canvas.
	 *
	 * Enabling viewport clipping may cause issues when using multiple viewports as some viewports may clip the contents of others.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {boolean}
	 * @default false
	 */
	clip;

	/**
	 * Clear the area that the Viewport renders to before each render tick.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {boolean}
	 * @default true
	 */
	clear;

	/**
	 * Enables anti-aliasing when rendering images.
	 *
	 * For games that make use of pixel art or pixel-perfect rendered images this option should be disabled.
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
	 * {@link Whirl.geometry.Point|Point} or {@link Whirl.Entity|Entity} to be followed by the viewport using its {@link Whirl.Viewport#lerp|lerp} value.
	 *
	 * If `null`, the {@link Whirl.Viewport#scroll|Viewport scroll} value will remain static unless directly modified.
	 *
	 * Do not set this value directly. Instead, use the {@link Whirl.Viewport#setTarget|setTarget} method.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.geometry.Point|Whirl.Entity|null}
	 * @default null
	 * @readonly
	 */
	target;

	/**
	 * Linear interpolation value used when animatedly scrolling to a given point or game object.
	 *
	 * When this viewport's camera is locked to an object in the world and the object moves, lowering this value will cause it to follow the object smoothly instead of locking onto its exact position at all times.
	 *
	 * Has no effect if {@link Whirl.Viewport#target|target} if `null`.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {number}
	 * @default 1
	 */
	lerp;

	/**
	 * Offset from the follow target to move to.
	 *
	 * Has no effect if {@link Whirl.Viewport#target|target} if `null`.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {Whirl.geometry.Point}
	 * @default (0, 0)
	 */
	offset;

	/**
	 * Similar to {@link Whirl.Entity#derived|Entity#derived}, but its calculated value takes into account the derived state of the emtire world after all other derived values have been calculated. This allows the Viewport to track objects in the game world and apply post-processing effects to them.
	 *
	 * @memberof Whirl.Viewport#
	 * @type {object}
	 * @readonly
	 * @default
	 * {
	 * 	scroll: Point,
	 * }
	 *
	 * @see Whirl.Entity#derived
	 */
	derived = {};

	constructor(game, options = {}) {
		super(game);

		if (options.bounds instanceof Rectangle._class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(
				getValue(options, "x", 0),
				getValue(options, "y", 0),
				getValue(options, "w", this._game.config.get("w", 0)),
				getValue(options, "h", this._game.config.get("h", 0))
			);
		}

		if (options.scroll instanceof Point._class) {
			this.scroll = options.scroll;
		} else {
			this.scroll = Point(getValue(options, "scrollX", 0), getValue(options, "scrollY", 0));
		}

		if (options.anchor instanceof Point._class) {
			this.anchor = options.anchor;
		} else {
			this.anchor = Point(getValue(options, "anchorX", 0), getValue(options, "anchorY", 0));
		}

		this.clip = getValue(options, "clip", false);

		this.clear = getValue(options, "clear", true);

		this.imageSmoothing = getValue(options, "imageSmoothing", true);

		this.zoom = getValue(options, "zoom", 1);

		this.lerp = getValue(options, "lerp", 1);

		this.setCanvas(options.canvas, options.resizeCanvas);

		if (options.stage) {
			this.setStage(options.stage, options.resizeStage);
		}

		if (options.camera) {
			this.setCamera(options.camera);
		}

		if (options.offset instanceof Point._class) {
			this.offset = options.offset;
		} else {
			this.offset = Point(getValue(options, "offsetX", 0), getValue(options, "offsetY", 0));
		}

		this.setTarget(options.target);

		this.derived.scroll = this.scroll.duplicate();
	}

	/**
	 * Set the canvas element to render to.
	 *
	 * If changing from one canvas to the another, the previous canvas pixels will not be cleared before switching to the other canvas.
	 *
	 * @method Whirl.Viewport#setCanvas
	 *
	 * @param {string} [selector] Selector for the canvas element. Defaults to the canvas element defined by the `canvas` in the {@link Whirl.Game.ConfigManager#canvas|global game configuration}.
	 * @param {boolean} [resize=false] Resize the canvas width and height to the width and height of this viewport's clipping plane.
	 * @returns {this}
	 *
	 * @example
	 * viewport.setCanvas("#myDifferentCanvas", true);
	 */
	setCanvas(selector = this._game.config.get("canvas"), resize = false) {
		this.render = this._game.render.renderer.getContext(selector);

		if (resize) {
			this.render.canvas.width = this.bounds.w;
			this.render.canvas.height = this.bounds.h;
		}

		return this;
	}

	/**
	 * Set the Stage to render.
	 *
	 * Stages that are no longer being rendered **will continue** to receive physics updates` in the background.
	 *
	 * @method Whirl.Viewport#setStage
	 *
	 * @param {Whirl.Stage} stage New stage to be used for rendering.
	 * @param {boolean} [resize=false] Modify the {@link Whirl.Stage#limits|Stage limits} to be repositioned and contained within the {@link Whirl.Viewport#bounds|bounds} of the viewport.
	 * @returns {this}
	 *
	 * @example
	 * const stage = Whirl.Stage(game);
	 *
	 * const viewport = Whirl.Viewport(game);
	 *
	 * viewport.setStage(stage);
	 *
	 * @example
	 * const stage = Whirl.Stage(game);
	 *
	 * const viewport = Whirl.Viewport(game, {
	 * 	stage
	 * });
	 */
	setStage(stage, resize = false) {
		if (typeof stage === "undefined" || (stage && !(stage instanceof Stage))) {
			this._game.debug.warn("Invalid Stage instance given to Viewport#setStage.", "Whirl.Viewport");

			this.stage = null;

			return this;
		}

		this.stage = stage;

		if (resize) {
			this.stage.limits.set({
				x: 0,
				y: 0,
				w: this.bounds.w,
				h: this.bounds.h,
			});
		}

		return this;
	}

	setCamera(camera) {
		if (typeof camera === "undefined" || (camera && !(camera instanceof Camera))) {
			this._game.debug.warn(
				"Invalid Camera instance given to Viewport#setCamera.",
				"Whirl.Viewport"
			);

			this.camera = null;

			return this;
		}

		this.camera = camera;

		return this;
	}

	/**
	 * Sets the target {@link Whirl.geometry.Point|Point} or {@link Whirl.Entity|Entity} to follow.
	 *
	 * Set to `null` (or give no arguments) to stop the viewport following anything, making its scroll position static again.
	 *
	 * Implicitly sets the {@link Whirl.Viewport#anchor|viewport anchor} to its center (`(0.5, 0.5)`).
	 *
	 * @method Whirl.Viewport#setTarget
	 *
	 * @param {Whirl.geometry.Point|Whirl.Entity|number|null} [target=null] Target Point or Entity to follow to. Else, give an integer as an X position and a Y position as a second argument to move to.
	 * @param {number} [y] Y-value.
	 * @returns {this}
	 *
	 * @example
	 * viewport.setTarget(sprite); // Follow Sprite 'sprite'
	 * viewport.setTarget(Point(100, 50)); // Gradually move to position (100, 50)
	 * viewport.setTarget(100, 50); // Gradually move to position (100, 50) but give points as two separate arguments
	 */
	setTarget(target, y) {
		if (target instanceof Point._class || target instanceof Entity) {
			this.anchor.set({
				x: 0.5,
				y: 0.5,
			});

			this.target = target;
		} else if (typeof target === "number" && typeof y === "number") {
			this.anchor.set({
				x: 0.5,
				y: 0.5,
			});

			this.target = Point(target, y);
		} else {
			this.target = null;
		}

		return this;
	}

	/**
	 * Retrieve a list of items from which this viewport can render in its view area.
	 *
	 * By default, items outside of the viewports' viewbox will be culled from the list and sorted by their `layer` property.
	 *
	 * @method Whirl.Viewport#getRenderables
	 *
	 * @param {Whirl.Base} [object={@link Whirl.Viewport#stage|this.stage}] Root object from which to retrieve the renderable items from.
	 * @param {Entity[]} [renderables] Additional entities to prepend to the renderables list.
	 *
	 * The renderables array is used to track renderable items as tree of objects is recursed on. You should not need to add additional entities in normal use.
	 *
	 * Defaults to recursing on the children of this viewports' {@link Whirl.Stage|Stage}, if it exists.
	 * @returns {Whirl.Base[]} Array of renderable items within the culling zone sorted by z-layer.
	 *
	 * @see Whirl.Entity
	 * @see Whirl.Stage
	 *
	 * @example
	 * viewport.getRenderables(); // [...]
	 */
	getRenderables(object = this.stage || {}, renderables = []) {
		if (!object.child) {
			renderables.push(object);
		} else {
			object.child
				.get((item) => item.active)
				.sort((a, b) => a.layer - b.layer)
				.forEach((item) => this.getRenderables(item, renderables));
		}

		return renderables;
	}

	calculateDerived() {
		this.derived.scroll.x = this.scroll.x - this.bounds.w * this.anchor.x;
		this.derived.scroll.y = this.scroll.y - this.bounds.h * this.anchor.y;
	}
}

module.exports = Viewport;
