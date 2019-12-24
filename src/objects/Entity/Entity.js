const Base = require("../Base/");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * The Entity class is the abstract class that all game objects that can exist in the game world must inherit from. Entities are the actual things that can exist in the world, whether static or dynamic, and all children of any given {@link Whirl.Stage|Stage} or Container must be an Entity.
 *
 * Holds attributes that are common to all objects that need to receive physics, tweening, input, rendering updates, etc.
 *
 * Objects that do not inherit from the Entity class cannot be added to the stage/game world.
 *
 * @class Entity
 * @memberof Whirl
 * @extends Whirl.Base
 * @abstract
 *
 * @param {Whirl.Game} game Game instance this entity belongs to and should be managed by.
 * @param {object} [options] Optional presets when initialising this object.
 * @param {number} options.alpha=1 Alpha/Transparency of this entity.
 * @param {number} options.scale=1 Scale of this entity. Increasing this value enlargens the object, decreasing it makes it smaller.
 * @param {number} options.layer=0 Z-layer this object should be rendered on. Objects with a higher `layer` value that are on the same implicit level as other objects with a lower `layer` value will be rendered on top.
 * @param {Whirl.shapes.Rectangle} options.body Rectangle shape used as the physics body for this entity.
 *
 * @example
 * class MyObject extends Whirl.Entity {
 * 	constructor(game) {
 * 		super(game);
 * 	}
 * }
 */
class Entity extends Base {
	/**
	 * Parent object that holds this entity.
	 *
	 * If the entity has a parent, it is guaranteed to {@link Whirl.mixins.Child|mix the Child mixin}.
	 *
	 * If a created Entity has not yet been added to the game world, it will not have a parent.
	 *
	 * @memberof Whirl.Entity#
	 * @type {object|null}
	 * @default null
	 */
	parent = null;

	/**
	 * Alpha/Transparency of this entity - value between `0` and `1`.
	 *
	 * Decreasing this value reduces the opacity. Entities with an alpha value of `0` will not be rendered at all. Entities with an alpha value above `1` will still be rendered fully opaque as is the default.
	 *
	 * @memberof Whirl.Entity#
	 * @type {number}
	 * @default 1
	 */
	alpha;

	/**
	 * Scale of this entity.
	 *
	 * Increasing this value enlargens the entity, decreasing it makes it smaller.
	 *
	 * Note that changing this value will scale both the entities rendered size as well as its physics body's size.
	 *
	 * Image sprite entities that are scaled under a {@link Whirl.Viewport|viewport with antialiasing enabled} may become pixelated and blurry.
	 *
	 * @memberof Whirl.Entity#
	 * @type {number}
	 * @default 1
	 */
	scale;

	/**
	 * Z-layer this object should be rendered on.
	 *
	 * Objects with a higher `layer` value that are on the same implicit level as other objects with a lower `layer` value will be rendered on top (similar to the `z-index` CSS property).
	 *
	 * Objects have an *implicit* and an *explicit* layer. The implicit layer is the level that the entity is on in the object hierarchy/tree of the game world. For example, all entities that are direct children of a stage are on the same implicit level. Within this, their explicit level can be moved up and down using this `layer` property.
	 *
	 * Keep in mind that this property only affects the **rendering** of this entity. Entities on different layers will still collide and interact with eachother under the game physics engine.
	 *
	 * @memberof Whirl.Entity#
	 * @type {number}
	 * @default 0
	 */
	layer;

	/**
	 * Rectangle shape used as the physics body for this entity.
	 *
	 * The rendered output of an entity and its physics body are two separate items. The physics body could be at a completey separate location and size to where the entity is rendered, but can be configured to always be in the same position and size of the entity.
	 *
	 * @memberof Whirl.Entity#
	 * @type {Whirl.shapes.Rectangle}
	 * @default {null}
	 */
	body;

	constructor(game, options = {}) {
		super(game);

		this.alpha = getValue(options, "alpha", 1);

		this.scale = getValue(options, "scale", 1);

		this.layer = getValue(options, "layer", 0);

		this.body = getValue(options, "body");
	}

	/**
	 * @method Whirl.Entity#destroy
	 *
	 * @override
	 */
	destroy() {
		if (this.parent && this.parent.child) {
			this.parent.child.remove(this, false);
		}

		return super.destroy();
	}
}

module.exports = Entity;
