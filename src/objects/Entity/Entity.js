const Base = require("../Base/");
const getValue = require("../../lib/getValue.js");

/**
 * @classdesc
 * Entities are the actual renderable and interactable things that exist in the game world, whether static or dynamic.
 *
 * Holds attributes that are common to all objects that need to receive physics, tweening, input, rendering updates, etc.
 *
 * Entities can be scaled up and down in size, made transparent, re-ordered on the z-axis, receive input, interact with each other with physics and more.
 *
 * Objects that do not inherit from the Entity class cannot be added to the stage/game world. All children of any given {@link Whirl.Stage|Stage} or {@link Whirl.Container|Container} must be an Entity.
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
 * @param {Whirl.geometry.Rectangle} options.body Rectangle shape used as the physics body for this entity.
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
	 * Clockwise rotation (**in degrees**) of this entity.
	 *
	 * Parent entities do not propogate this value down to their children.
	 *
	 * Note that the built-in physics engine *does not* take this value into account, and will not rotate its corresponding physics body.
	 *
	 * @memberof Whirl.Entity#
	 * @type {number}
	 * @default 0
	 *
	 * @see Whirl.math.degrees
	 * @see Whirl.math.radians
	 */
	rotation;

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
	 * @type {Whirl.geometry.Rectangle}
	 * @default {null}
	 */
	body;

	/**
	 * Represents the *actual* values of this Entity after all updates and modifications have been applied, taking into account the Entity's parent and its own properties. Rendering and physics systems will use this value to know exactly where the Entity is on the screen.
	 *
	 * For example, if a {@link Whirl.Sprite|Sprite} has an `anchor` of `(0.5, 0.5)` and its `bounds` {@link Whirl.geometry.Rectangle|Rectangle} property is `(100x, 100y, 50w, 50h)`, then its `derived.bounds` property would be `(75x, 75y, 50w, 50h)`, which is where it would actually end up on the screen.
	 *
	 * Each object's value is derived from its own value and its parent value. This way, values cascade down the tree of objects and changes made in a parent container will affect all of its children under it in the tree.
	 *
	 * You should only rely on this object being in a consistent state when the {@link Whirl.Game#event:didUpdate|Game 'didUpdate' event} fires as it is calculated during the update step.
	 *
	 * Entities that act as containers (such as the {@link Whirl.Stage|Stage} and {@link Whirl.Container|Container} objects) must attach `x` and `y` properties to this object that represent how the parent will offset the position of its children.
	 *
	 * @memberof Whirl.Entity#
	 * @type {object}
	 * @readonly
	 * @default
	 * {
	 * 	alpha: 1,
	 * 	scale: 1,
	 * }
	 */
	derived = {};

	constructor(game, options = {}) {
		super(game);

		this.alpha = getValue(options, "alpha", 1);

		this.scale = getValue(options, "scale", 1);

		this.rotation = getValue(options, "rotation", 0);

		this.layer = getValue(options, "layer", 0);

		this.body = getValue(options, "body");

		this.derived = {
			alpha: this.alpha,
			scale: this.scale,
		};
	}

	/**
	 * Calculate the `derived` value of this Entity, taking into account any offsets applied by the parent container, viewport, stage and game.
	 *
	 * When making your own custom entities and overriding this method, you must at some point also invoke the original Entity class `calculateDerived` method:
	 *
	 * ```javascript
	 * class MyObject extends Whirl.Entity {
	 * 	calculateDerived() {
	 * 		// Derive your own values and place on the `derived` object here ...
	 *
	 * 		return super.calculateDerived();
	 * 	}
	 * }
	 * ```
	 *
	 * @method Whirl.Entity#calculateDerived
	 *
	 * @returns {this}
	 */
	calculateDerived() {
		this.derived.alpha = this.alpha * this.parent.derived.alpha;
		this.derived.scale = this.scale * this.parent.derived.scale;

		return this;
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
