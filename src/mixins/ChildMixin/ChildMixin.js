const Mixin = require("../Mixin.js");

/**
 * @classdesc
 * Child system that Whirl uses to store groups of objects into a parent-child structure. A single parent can have multiple children, and those children in turn can have the child mixin, forming a tree of objects that interact with eachother.
 * 
 * Parents control their children and can reference each child individually, whereas children cannot communicate with their parent directly. If you need to communicate with the parent object from the child you should make use of {@link Whirl.mixins.Event|the event system} and emit data upwards/globally or, if using a custom class, use composition over inheritance.
 * 
 * Parent objects can mediate which objects are added to their pool of children by giving a validation function that filters potential children.
 * 
 * This mixin is stored under the `child` namespace.
 * 
 * @class Child
 * @memberof Whirl.mixins
 * @extends Whirl.mixins.Mixin
 * @mixin
 */
class ChildMixin extends Mixin {
	/**
	 * @ignore
	 * @memberof Whirl.mixins.Child
	 * @type {string}
	 * @constant
	 * @override
	 */
	static _namespace = "child";

	/**
	 * Array used internally to store each direct descendent child of this object.
	 * 
	 * @memberof Whirl.mixins.Child#
	 * @type {any[]}
	 * @private
	 */
	_children = [];

	/**
	 * Add one or many objects as direct children of this object.
	 * 
	 * @method Whirl.mixins.Child#add
	 * 
	 * @param {any|any[]} object Object or array of objects to be added as children.
	 * 
	 * @example
	 * const {Game, Stage, Sprite} = Whirl;
	 * 
	 * const game = Game();
	 * 
	 * const stage = Stage(game);
	 * 
	 * const sprite = Sprite(game);
	 * 
	 * stage.child.add(sprite);
	 * 
	 * @example
	 * stage.child.add([sprite1, sprite2, sprite3]);
	 */
	add(object) {
		if (Array.isArray(object)) {
			if (!object.every((o) => this.validate(o))) {
				console.warn("Whirl | ChildMixin | All child objects must satisfy the validation check to be added.");
				
				return this._source;
			}

			object.forEach((o) => {
				this.add(o);
			});
		} else {
			if (!this.validate(object)) {
				console.warn("Whirl | ChildMixin | Child object does not satisfy the validation check and will not be added.");
				
				return this._source;
			}

			this._children.push(object);
		}

		return this._source;
	}

	/**
	 * Filter children during the process of retrieving the list of direct descendents. Each time the function is called a single child is passed to it.
	 * 
	 * @callback Whirl.mixins.Child~getFilter
	 * @param {any} child The child object to check if it should be included.
	 * @return {boolean} `true` implies the child should be included, `false` will remove it from the list of returned children.
	 */

	/**
	 * Get all of the direct children of this object. Optionally filter the returned children using a given filter function.
	 * 
	 * @method Whirl.mixins.Child#get
	 * 
	 * @param {getFilter} [filter] Function ran on each object that determines whether the child is returned in the list of children.
	 * @returns {any[]} Array representing the children of this object.
	 */
	get(filter) {
		if (filter) {
			return [...this._children.filter(filter)];
		}

		return [...this._children];
	}

	/**
	 * Empty the list of children this object has.
	 * 
	 * @method Whirl.mixins.Child#
	 */
	remove() {
		this._children.length = 0;
	}

	/**
	 * Override this method to enforce a validation on every object that is attempted to be added as a child to this object.
	 * 
	 * When adding a child or children, every potential child must pass this validation check or will not be added and a warning will be logged to the console.
	 * 
	 * By default will allow any object to be added as a child.
	 * 
	 * @method Whirl.mixins.Child#validate
	 * 
	 * @param {any} object Single child to be potentially be added to the object.
	 * @returns {boolean}
	 * 
	 * @example
	 * // In some method (Usually the constructor) of your custom class
	 * // Enforce that every child inherit from the `Entity` class
	 * this.child.validate = (object) => object instanceof Whirl.Entity;
	 */
	validate(object) {
		return true;
	}
}

module.exports = ChildMixin;
