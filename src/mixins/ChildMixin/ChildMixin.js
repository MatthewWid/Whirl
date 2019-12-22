const Mixin = require("../Mixin.js");

/**
 * @classdesc
 * Child system that Whirl uses to store groups of objects into a parent-child structure. A single parent can have multiple children, and those children in turn can have the child mixin, forming a tree of objects that interact with eachother.
 *
 * Parents control their children and can reference each child individually, whereas children cannot communicate with their parent directly. If you need to communicate with the parent object from the child you should make use of {@link Whirl.mixins.Event|the event system} and emit data upwards/globally or, if using a custom class, use composition over inheritance.
 *
 * Parent objects can mediate which objects are added to their pool of children by giving a validation function that filters potential children. Without this, children of any type can be added as a descendent.
 *
 * This mixin is stored under the `child` namespace.
 *
 * @class Child
 * @memberof Whirl.mixins
 * @extends Whirl.mixins.Mixin
 * @mixin
 *
 * @example
 * const {mixins: {Mixin, Child}} = Whirl;
 *
 * class MyObject {
 * 	mixins = [Child];
 *
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 *
 * const obj = new MyObject();
 *
 * obj.child.get(); // []
 *
 * obj.child.add([
 * 	"Some string",
 * 	931,
 * 	{
 * 		x: 5,
 * 		y: 9
 * 	}
 * ]);
 *
 * obj.child.get(); // ["Some string", 931, {...}]
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
			if (object.some((o) => this.validate(o) === false)) {
				console.warn(
					"Whirl | ChildMixin | All child objects must satisfy the validation check to be added."
				);

				return this._source;
			}

			object.forEach((o) => {
				this.add(o);
			});
		} else {
			if (this.validate(object) === false) {
				console.warn(
					"Whirl | ChildMixin | Child object does not satisfy the validation check and will not be added."
				);

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
	 * @param {any} child Child object to check if it should be included.
	 * @return {boolean} `true` implies the child should be included, `false` will remove it from the list of returned children.
	 */

	/**
	 * Get all of the direct children of this object. Optionally filter the returned children using a given filter function.
	 *
	 * @method Whirl.mixins.Child#get
	 *
	 * @param {getFilter} [filter] Runs on each object and determines if the given child should remain in the returned list.
	 * @returns {any[]} Array representing the children of this object.
	 */
	get(filter) {
		if (filter) {
			return [...this._children.filter(filter)];
		}

		return [...this._children];
	}

	/**
	 * Remove a specific item from this list, or remove all items at once.
	 *
	 * @method Whirl.mixins.Child#remove
	 *
	 * @param {any} [object] Specific object to remove from the child list. If not provided, will empty child list entirely.
	 * @param {boolean} [deep=true] Whether to recurse down the potential tree of objects with children or only remove from the immediate level of children. Has no effect if `object` is not provided.
	 */
	remove(object, deep = true) {
		if (object) {
			if (deep) {
				this._children = this._children.filter((item) => {
					if (item === object) {
						return false;
					} else if (item.child) {
						item.child.remove(object, true);
					}

					return true;
				});
			} else {
				this._children = this._children.filter((item) => item !== object);
			}
		} else {
			this._children.length = 0;
		}
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
	validate(object) {}
}

module.exports = ChildMixin;
