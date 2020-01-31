const Base = require("../Base/");
const Stage = require("../Stage/");
const Entity = require("../Entity/");
const Sprite = require("../Sprite/");
const {Rectangle, Point} = require("../../geometry/");
const getValue = require("../../lib/getValue.js");
const lerp = require("../../math/lerp.js");

/**
 * @classdesc
 * Viewports render {@link Whirl.Stage|the game world} onto a section of your screen.
 *
 * A viewport is defined by a rectangular clipping plane and a scroll value. The clipping plane `x` and `y` values move the rendered view around the screen space, and its `w` and `h` values define size of the viewport on the screen. If {@link Whirl.Viewport#clip|clip} is set to `true` anything outside of the clipping plane will not be rendered.
 *
 * Viewports can look around the game world by use of its {@link Whirl.Viewport#scroll|scroll value} which moves the camera view around the game world. Alternatively, {@link Whirl.Viewport#setTarget|set a follow target} to have the viewport automatically follow and scroll towards a {@link Whirl.geometry.Point|Point} or {@link Whirl.Entity|Entity} in the world.
 *
 * Think of a Viewport that renders a camera looking into your world. The viewport camera is the view relative to the game world (your stage), and the viewport itself is where it is rendered onto your screen.
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
 * @param {Whirl.geometry.Rectangle} options.bounds=(0,0,ConfigManager.w,ConfigManager.h) Set the bounds of the clipping plane. Alternatively, give each dimension of the clipping plane manually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect this viewports bounds in response.
 * @param {number} options.x=0 X-coordinate of the clipping plane relative to the screen.
 * @param {number} options.y=0 Y-coordinate of the clipping plane relative to the screen.
 * @param {number} options.w=ConfigManager.w Width of the clipping plane.
 * @param {number} options.h=ConfigManager.h Height of the clipping plane.
 * @param {Whirl.geometry.Point} options.scroll=(0,0) Set the initial scroll value around the world. Alternatively, give each scroll value individually with the `scrollX` and `scrollY` options.
 * @param {number} options.scrollX=0 X-coordinate of the scroll position.
 * @param {number} options.scrollY=0 Y-coordinate of the scroll position.
 * @param {number} options.anchorX=0 X-coordinate of the anchor point (0-1).
 * @param {number} options.anchorY=0 Y-coordinate of this sprite's anchor point (0-1).
 * @param {boolean} options.clip=false Remove all pixels that are outside of the clipping plane from the rendered output on the canvas.
 * @param {boolean} options.clear=true Clear the area being rendered to before each render tick.
 * @param {boolean} options.imageSmoothing=true Canvas anti-aliasing.
 * @param {number} options.zoom=1 Initial zoom level. Increasing this value zooms in, decreasing it zooms out.
 * @param {Whirl.geometry.Point|Whirl.Entity} options.target=null Target Point or Entity to follow.
 * @param {number} options.lerp=1 Linear interpolation value to use when animatedly scrolling to a given point or game object.
 * @param {number} options.offset=(0,0) Set the initial offset value relative to the scroll. Alternatively, give each offset value individually with the `offsetX` and `offsetY` options.
 * @param {number} options.offsetX=0 X-coordinate of the offset.
 * @param {number} options.offsetY=0 Y-coordinate of the offset.
 * @param {string} options.canvas=ConfigManager.canvas Selector for the canvas element to render to. If not given, will default to the `canvas` value stored in {@link Whirl.Game.ConfigManager#canvas|the game configuration}.
 *
 * Implicitely calls the {@link Whirl.Viewport#setCanvas|`setCanvas`} method.
 * @param {boolean} options.resizeCanvas=false Resize the canvas width and height to the same width and height of this viewports clipping plane.
 * @param {Whirl.Stage} options.stage Initial stage to be rendered by this Viewport.
 *
 * Implicitely calls the {@link Whirl.Viewport#setCanvas|`setCanvas`} method.
 * @param {boolean} options.resizeStage=false Resize the stage bounds to the same position and dimensions of this viewport.
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
	 * Reference to the Stage/game world that this viewport will render.
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
	 * Linear interpolation value used when scrolling to a given point or game object.
	 *
	 * When the viewport camera is locked to an object in the world and the object moves, lowering this value will cause it to follow the object more smoothly instead of hard-locking onto the object.
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
	 * When a viewport moves toward a target, it will move toward the targets position *plus* the offset position.
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

	/**
	 * Sets the target {@link Whirl.geometry.Point|Point} or {@link Whirl.Entity|Entity} to follow.
	 *
	 * Set to `null` (or give no arguments) to stop the viewport following anything, making its scroll position static again.
	 *
	 * Implicitly sets the {@link Whirl.Viewport#anchor|viewport anchor} to its center (`(0.5, 0.5)`).
	 *
	 * You may also provide a {@link Whirl.Viewport#lerp|`lerp` value} as the last argument, else it remains unchanged.
	 *
	 * @method Whirl.Viewport#setTarget
	 *
	 * @param {Whirl.geometry.Point|Whirl.Entity|number|null} [target=null] Target Point or Entity to follow to. Else, give an integer as an X position and a Y position as a second argument to move to.
	 * @param {number} [y] Y-coordinate to move to.
	 *
	 * If the first argument is a Point or Entity instance, instead can be given as the new {@link Whirl.Viewport#lerp|lerp value} for the viewport.
	 * @param {number} [lerp] If the first two arguments are numbers (for coordinates), give a number to this argument to set the new {@link Whirl.Viewport#lerp|lerp value} for the viewport. Else, can be given as the second argument (See examples).
	 * @returns {this}
	 *
	 * @example
	 * viewport.setTarget(sprite); // Follow Sprite 'sprite'
	 *
	 * viewport.setTarget(sprite, 0.05); // Follow Sprite 'sprite' and set `lerp` to 0.05
	 *
	 * viewport.setTarget(Point(100, 50)); // Follow to point (100, 50)
	 *
	 * viewport.setTarget(100, 50); // Follow to position (100, 50), giving coordinates as separate arguments
	 *
	 * viewport.setTarget(100, 50, 0.02); // Follow to (100, 50) and set `lerp` to 0.02
	 */
	setTarget(target, y, lerp) {
		if (target instanceof Point._class || target instanceof Entity) {
			this.anchor.set({
				x: 0.5,
				y: 0.5,
			});

			this.target = target;

			if (typeof y === "number") {
				this.lerp = y;
			}
		} else if (typeof target === "number" && typeof y === "number") {
			this.anchor.set({
				x: 0.5,
				y: 0.5,
			});

			this.target = Point(target, y);

			if (typeof lerp === "number") {
				this.lerp = lerp;
			}
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

	/**
	 * Translate a point on the actual output screen/canvas to a point on the Viewport screen.
	 *
	 * For example, if the Viewport bounds are positioned at coordinate `(50, 50)`, then calling `viewport.translateToScreen(0, 0)` (as if the user clicked at `(0, 0)` on the canvas) will return `Point {x: -50, y: -50}`.
	 *
	 * @method Whirl.Viewport#translateToScreen
	 *
	 * @param {number|Whirl.geometry.Point} x X-coordinate if the point to translate. An instance of a Point can also be given instead as the only argument.
	 * @param {number} [y] Y-coordinate.
	 * @returns {Whirl.geometry.Point} Point relative to the Viewport screen.
	 */
	translateToScreen(px, py) {
		let x = px;
		let y = py;

		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		x -= this.bounds.x;
		y -= this.bounds.y;

		return Point(x, y);
	}

	/**
	 * Translate a point on the Viewport screen to a point in the game world.
	 *
	 * For example, if the Stage inside a Viewport is positioned at coordinate `(50, 50)`, then calling `viewport.translateToWorld(120, 120)` will return `Point {x: 170, y: 170}`.
	 *
	 * Does not take into account the {@link Whirl.Viewport#bounds|Viewport bounds position}. If you would like it to, either make use of the {@link Whirl.Viewport#translateToScreen|translateToScreen} method first, or simply add the bounds `x` and `y` to the returned coordinate's `x` and `y`.
	 *
	 * @method Whirl.Viewport#translateToWorld
	 *
	 * @param {number|Whirl.geometry.Point} x X-coordinate of the point. An instance of a Point can also be given instead as the only argument.
	 * @param {number} [y] Y-coordinate.
	 * @returns {Whirl.geometry.Point|null} Point relative to the game world. If the Viewport has no {@link Whirl.Viewport#stage|`stage` value} then returns `null`.
	 */
	translateToWorld(px, py) {
		if (this.stage === null) {
			return null;
		}

		let x = px;
		let y = py;

		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		x -= this.stage.limits.x;
		y -= this.stage.limits.y;

		x += this.derived.scroll.x;
		y -= this.derived.scroll.y;

		return Point(x, y);
	}

	calculateDerived() {
		if (this.target) {
			let targetX, targetY;

			// Get the middle point of the target
			if (this.target instanceof Sprite) {
				const mid = this.target.derived.bounds.midpoint;
				targetX = mid.x;
				targetY = mid.y;
			}
			if (this.target instanceof Point._class) {
				targetX = this.target.x;
				targetY = this.target.y;
			}

			// Set scroll position to lerp between current scroll position and target position
			this.scroll.x = lerp(this.scroll.x, targetX + this.offset.x, this.lerp);
			this.scroll.y = lerp(this.scroll.y, targetY + this.offset.y, this.lerp);
		}

		this.derived.scroll.x = this.scroll.x * this.zoom - this.bounds.w * this.anchor.x;
		this.derived.scroll.y = this.scroll.y * this.zoom - this.bounds.h * this.anchor.y;
	}
}

module.exports = Viewport;
