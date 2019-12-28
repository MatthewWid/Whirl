const Entity = require("../Entity/");
const {
	Mixin: {apply: mixin},
	Child,
} = require("../../mixins/");
const addInheritFilter = require("../../lib/addInheritFilter.js");

/**
 * @classdesc
 * Containers are entities that contain other entities. They allow for multiple entities to be grouped tgoether and have effects and offsets applied to them all at once.
 *
 * Containers can contain other containers, creating a tree that each apply their own effects to the lower levels.
 *
 * @class Container
 * @memberof Whirl
 * @extends Whirl.Entity
 * @mixes Whirl.mixins.Child
 *
 * @param {Whirl.Game} game Game instance this container belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 * @param {Entity[]} [children] Array of children to initialise into this container.
 *
 * @example
 * game.Container({}, [child1, child2]);
 * // or
 * Whirl.Container(game, {}, [child1, child2]);
 */
class Container extends Entity {
	mixins = [Child];

	constructor(game, options = {}, children = []) {
		super(game, options);

		mixin(this);

		this.child.onAdd = addInheritFilter(this, Entity);

		this.child.add(children);
	}

	calculateDerived() {
		this.derived.x = this.parent.derived.x;
		this.derived.y = this.parent.derived.y;

		return super.calculateDerived();
	}
}

module.exports = Container;
