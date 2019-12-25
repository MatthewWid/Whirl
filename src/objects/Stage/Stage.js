const Base = require("../Base/");
const Entity = require("../Entity/");
const {
	Mixin: {apply: mixin},
	Child,
} = require("../../mixins/");
const {Rectangle} = require("../../shapes/");
const addInheritFilter = require("../../lib/addInheritFilter.js");

/**
 * @classdesc
 * Stages acts as the game world itself. It is responsible for storing game objects to rendered in the world, game physics and collision detection, world bounds, etc.
 *
 * A stage is limited by its world boundaries. If configured, objects that leave this world boundary will not be updated and/or rendered.
 *
 * Game objects are added to the stage using {@link Whirl.mixins.Child|the Child mixin}. Objects added to the stage **must** inherit from the `Entity` class.
 *
 * @class Stage
 * @memberof Whirl
 * @extends Whirl.Base
 * @mixes Whirl.mixins.Child
 *
 * @param {Whirl.Game} game Game instance this stage belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 * @param {Whirl.shapes.Rectangle} options.limit Position and size of the game world. Alternatively, give each dimension of the world border manually with the `x`, `y`, `w` and `h` options.
 *
 * Passed as reference - changing properties of the given Rectangle instance will also affect this stage's limit in response.
 * @param {number} options.x=0 X-coordinate of the stage limit.
 * @param {number} options.y=0 Y-coordinate of the stage limit.
 * @param {number} options.w=0 Width of the stage limit.
 * @param {number} options.h=0 Height of the stage limit.
 * @param {Entity[]} [children] Array of children to initialise into the stage world.
 *
 * @example
 * game.Stage({
 * 	limit: Whirl.shapes.Rectangle(0, 0, 400, 400)
 * });
 * // or
 * Whirl.Stage(game, {
 * 	limit: Whirl.shapes.Rectangle(0, 0, 400, 400)
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
	 * @type {Whirl.shapes.Rectangle}
	 */
	limit;

	constructor(game, options = {}, children = []) {
		super(game);

		mixin(this);

		this.child.onAdd = addInheritFilter(this, "Stage", Entity);

		this.child.add(children);

		if (options.limit instanceof Rectangle._class) {
			this.limit = options.limit;
		} else {
			this.limit = Rectangle(options.x || 0, options.y || 0, options.w || 0, options.h || 0);
		}
	}
}

module.exports = Stage;
