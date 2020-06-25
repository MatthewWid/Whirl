import Mixin from "../Mixin";

/**
 * @classdesc
 * Child system used to store groups of objects into a parent-child structure. A single parent can have multiple children, and those children in turn can have the child mixin, forming a tree/hierarchy of objects.
 *
 * Parents control their children and can reference each child individually. However, children do not know about their parent. If you need to communicate with the parent object from the child you should make use of {@link Whirl.mixins.Event|the event system} and emit data upwards/globally.
 *
 * Parent objects can mediate which objects are added to their pool of children by giving a validation function that filters potential children.
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
	 * Objects may not necessarily be added if the parent rejects it {@link Whirl.mixins.Child#onAdd|because of its filtering function}.
	 *
	 * @method Whirl.mixins.Child#add
	 *
	 * @param {any|any[]} object Object or array of objects to be added as children.
	 *
	 * @example
	 * const game = Whirl.Game();
	 *
	 * const stage = game.Stage();
	 *
	 * const sprite = game.Sprite();
	 *
	 * stage.child.add(sprite);
	 *
	 * @example
	 * stage.child.add([sprite1, sprite2, sprite3]);
	 */
	add(object) {
		if (Array.isArray(object)) {
			object.forEach((o) => this.add(o));
		} else if (this.onAdd(object) !== false) {
			this._children.push(object);
		}

		return this._source;
	}

	/**
	 * Filter children during the process of retrieving the list of direct descendents. Each time the function is called a single child is passed to it.
	 *
	 * Returning `true` implies the child should be included, `false` will remove it from the list of returned children.
	 *
	 * @callback Whirl.mixins.Child~getFilter
	 * @param {any} child Child object to check if it should be included.
	 * @return {boolean} `true` implies the child should be included, `false` will remove it from the list of returned children.
	 */

	/**
	 * Get all children of this object. Optionally filter the returned children using a given filter function.
	 *
	 * Returns only the direct children of this object, and will *not* recursively go deeper into the tree if any children also in-turn have children.
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
	 * Remove a specific child or remove all children at once.
	 *
	 * The given object is checked against the list of children using [strict/referential equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity).
	 *
	 * Will remove all instances, including duplicates, of the given object. For example, if an object is added multiple times as a child then a single call to the `remove` method is made, all duplicate instances of the object will be removed at once.
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
	 * Runs before each object attempts to be added as a child.
	 *
	 * If an array of children are added, this function will be called on each child individually.
	 *
	 * Optionally return `false` to reject the object from being added as a child.
	 *
	 * @method Whirl.mixins.Child#onAdd
	 *
	 * @param {any} object Single child to be potentially be added to the object child pool.
	 * @returns {boolean|undefined}
	 *
	 * @example
	 * // Enforce that every child inherit from the `Entity` class
	 * this.child.onAdd = (object) => object instanceof Whirl.Entity;
	 */
	onAdd() {}
}

export default ChildMixin;
