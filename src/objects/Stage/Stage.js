const Base = require("../Base/");
const Entity = require("../Entity/");
const {
	Mixin: {apply: mixin},
	Child,
} = require("../../mixins/");
const {Rectangle} = require("../../geometry/");
const getValue = require("../../lib/getValue.js");
const addInheritFilter = require("../../lib/addInheritFilter.js");

/**
 * @classdesc
 * Stages act as as the game world itself. They are responsible for storing game objects, game physics, collision detection, world bounds, etc.
 *
 * A stage is limited by its world boundaries. If configured, objects that leave this world boundary will not be updated and/or rendered.
 *
 * Stages, even if not being rendered by a {@link Whirl.Viewport|Viewport}, will continue updating and running the physics simulation in the background. This makes it easy to swap in and out stages being rendered by a viewport, giving you the concept of different levels and scenes that you can quickly switch back and forth between.
 *
 * Game objects are added to the stage using {@link Whirl.mixins.Child|the Child mixin}. Objects added to the stage **must** inherit from the `Entity` class.
 *
 * Note that modifying Entity-related properties of a stage such as `alpha`, `scale`, `rotation` and `layer` has no effect on the game world.
 *
 * @class Stage
 * @memberof Whirl
 * @extends Whirl.Entity
 * @mixes Whirl.mixins.Child
 *
 * @param {Whirl.Game} game Game instance this stage belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 *
 * Either provide the world limits with a {@link Whirl.geometry.Rectangle|Rectangle} instance, or give each value individually with `x`, `y`, `w` and `h`.
 * @param {Whirl.geometry.Rectangle} options.limits Position and size of the game world. Alternatively, give each dimension of the world border manually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect the stage world limit.
 * @param {number} options.x=0 X-coordinate of the stage limit.
 * @param {number} options.y=0 Y-coordinate of the stage limit.
 * @param {number} options.w=ConfigManager.w Width of the stage limit.
 * @param {number} options.h=ConfigManager.h Height of the stage limit.
 * @param {Entity[]} [children] Array of children to initialise into the stage world.
 *
 * @example
 * game.Stage({
 * 	limit: Whirl.geometry.Rectangle(0, 0, 400, 400)
 * });
 * // or
 * Whirl.Stage(game, {
 * 	limit: Whirl.geometry.Rectangle(0, 0, 400, 400)
 * });
 */
class Stage extends Base {
	mixins = [Child];

	/**
	 * Limit of the game world in this stage.
	 *
	 * Objects that exist outside of this limit can be configured to:
	 *
	 * * Not render at all *and/or*
	 * * Not receive physics updates *and/or*
	 * * Not be able to leave the world limit.
	 *
	 * @memberof Whirl.Stage#
	 * @type {Whirl.geometry.Rectangle}
	 */
	limits;

	/**
	 * Similar to {@link Whirl.Entity#derived|Entity#derived}.
	 *
	 * @memberof Whirl.Stage#
	 * @type {object}
	 * @readonly
	 * @default
	 * {
	 * 	limits: Rectangle
	 * }
	 *
	 * @see Whirl.Entity#derived
	 */
	derived = {};

	constructor(game, options = {}, children = []) {
		super(game);

		mixin(this);

		if (options.limits instanceof Rectangle._class) {
			this.limits = options.limits;
		} else {
			this.limits = Rectangle(
				getValue(options, "x", 0),
				getValue(options, "y", 0),
				getValue(options, "w", this._game.config.get("w", 0)),
				getValue(options, "h", this._game.config.get("h", 0))
			);
		}

		this.child.onAdd = addInheritFilter(this, Entity);

		this.child.add(children);

		this.derived.limits = this.limits.duplicate();
	}

	/**
	 * Invoke the `calculateDerived` method on all children in the tree of children belonging to this Stage.
	 *
	 * Invoked internally by the {@link Whirl.Game.UpdateManager|UpdateManager}.
	 *
	 * @ignore
	 * @method Whirl.Stage#calculateDerived
	 *
	 * @param {Entity} object Current object to update.
	 * @returns {this}
	 */
	calculateDerived(object = this) {
		if (object === this) {
			this.derived.limits.x = this.limits.x;
			this.derived.limits.y = this.limits.y;
		} else {
			object.calculateDerived();
		}

		if (object.child) {
			object.child.get((item) => item.active).forEach((item) => this.calculateDerived(item));
		}

		return this;
	}
}

module.exports = Stage;
