const Entity = require("../Entity/");
const {
	Mixin: {apply: mixin},
	Child,
} = require("../../mixins/");
const addInheritFilter = require("../../lib/addInheritFilter.js");

/**
 * @classdesc
 * Containers are entities that contain other entities. They allow for multiple entities to be grouped and have offsets and effects applied to them all at once.
 */
class Container extends Entity {
	mixins = [Child];

	constructor(game, options = {}, children = []) {
		super(game);

		mixin(this);

		this.child.onAdd = addInheritFilter(this, "Container", Entity);

		this.child.add(children);
	}
}

module.exports = Container;
