const Base = require("../Base/");
const Container = require("../Container/");
const {Rectangle} = require("../../geometry/");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * Stages encompass the game world itself. They are responsible for storing game objects, physics, collision detection, world bounds and more.
 *
 * Stages, even if not being rendered by a {@link Whirl.Viewport|Viewport}, will continue updating and running the physics simulation in the background. This makes it easy to swap in and out stages being rendered by a viewport giving you the concept of different levels and scenes that you can quickly switch back and forth between.
 *
 * A stage is limited by its world boundaries. If configured, objects that leave this world boundary will not be updated and/or rendered.
 *
 * Game objects are added to the game world using the {@link Whirl.mixins.Child|Child mixin} on the {@link Whirl.Stage#container|root Container object} that the Stage holds. Objects added to the game world **must** inherit from the {@link Whirl.Entity|Entity} class.
 *
 * @class Stage
 * @memberof Whirl
 * @extends Whirl.Base
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
 * @param {Entity[]} [children] Array of children to initialise into the stage world. Will be inserted into the root {@link Whirl.Container|Container}.
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
	/**
	 * Root container that holds all objects in the game world.
	 *
	 * Do not modify this property directly. Instead, use the `setContainer` method.
	 *
	 * @memberof Whirl.Stage#
	 * @type {Whirl.Container}
	 * @readonly
	 */
	container;

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
	 * Alias to the the root {@link Whirl.Stage#container|Container} {@link Whirl.mixins.ChildMixin|Child mixin} that this Stage holds.
	 *
	 * @name child
	 * @memberof Whirl.Stage#
	 * @type {Whirl.mixins.Child}
	 *
	 * @example
	 * stage.child.add(sprite);
	 * // or
	 * stage.container.child.add(sprite);
	 */

	constructor(game, options = {}, children = []) {
		super(game);

		if (options.limits instanceof Rectangle._class) {
			this.limits = options.limits;
		} else {
			this.limits = Rectangle(
				getValue(options, "x", 0),
				getValue(options, "y", 0),
				getValue(options, "w", this.game.config.get("w", 0)),
				getValue(options, "h", this.game.config.get("h", 0))
			);
		}

		this.setContainer(getValue(options, "container"));

		this.container.child.add(children);
	}

	/**
	 * Set the root container that holds all objects in the game world.
	 *
	 * If no arguments are given, creates a new Container object for you.
	 *
	 * @method Whirl.Stage#setContainer
	 *
	 * @param {Whirl.Container} [container] New root container.
	 * @returns {this}
	 *
	 * @example
	 * stage.setContainer();
	 *
	 * @example
	 * const container = game.Container();
	 * const stage = game.Stage().setContainer(container);
	 */
	setContainer(container) {
		if (this.container) {
			this.container.parent = null;
		}

		if (container instanceof Container) {
			this.container = container;
		} else {
			this.container = new Container(this.game);
		}

		this.container.parent = this;

		this.child = this.container.child;

		return this;
	}

	/**
	 * Invoke the `calculateDerived` method on all children in the tree of children in the game world.
	 *
	 * Invoked internally by the {@link Whirl.Game.UpdateManager|UpdateManager}.
	 *
	 * @ignore
	 * @method Whirl.Stage#calculateDerived
	 *
	 * @param {Entity} object Current object to update.
	 * @returns {this}
	 */
	calculateDerived(object = this.container) {
		object.calculateDerived();

		if (object.child) {
			object.child.get((item) => item.active).forEach((item) => this.calculateDerived(item));
		}

		return this;
	}
}

module.exports = Stage;
