/**
 * @classdesc
 * Base Mixin class that all other mixin classes inherit from. Used to apply mixins to objects and create your own custom mixins.
 *
 * Mixins are reusable pieces of functionality that are injected into a class under a specified property (the "namespace") that adds behaviours to the object without the use of inheritance.
 *
 * Mixins are typically not instantiated directly, but by the use of the {@link Whirl.mixins.Mixin.apply|Mixin.apply} method.
 *
 * @class Mixin
 * @memberof Whirl.mixins
 * @abstract
 *
 * @param {object} [source] Source object that this mixin will be applied to.
 *
 * @example
 * const {mixins: {Mixin, Child}} = Whirl;
 *
 * // Add the `Child` mixin to `MyObject`
 * class MyObject {
 * 	mixins = [Child];
 *
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 *
 * @example
 * const {mixins: {Mixin}} = Whirl;
 *
 * // Create a custom mixin `LogMixin`
 * class LogMixin extends Mixin {
 * 	static _namespace = "log"; // Attach under the `log` property
 *
 * 	sayHi() {
 * 		console.log("Hello world!");
 * 	}
 * }
 *
 * // Create class `MyObject` and mix in `LogMixin`
 * class MyObject {
 * 	mixins = [LogMixin];
 *
 * 	constructor() {
 * 		Mixin.apply(this);
 * 	}
 * }
 *
 * // Instantiate our `MyObject` class
 * const object = new MyObject();
 *
 * // Call our `sayHi` method under our defined `log` namespace
 * object.log.sayHi(); // "Hello world" is logged to the console
 */
class Mixin {
	/**
	 * Property on the source object that the mixin will be namespaced under.
	 *
	 * For example, a `_namespace` value of `event` will be attahced to the source object as `<Object>.event`.
	 *
	 * @memberof Whirl.mixins.Mixin
	 * @type {string}
	 * @abstract
	 */
	static _namespace = null;

	/**
	 * The source object that this mixin instance is applied to.
	 *
	 * @memberof Whirl.mixins.Mixin
	 * @type {object}
	 */
	_source;

	constructor(source) {
		this._source = source;
	}

	/**
	 * Apply mixins to a given object.
	 *
	 * "Applied" means that the mixin is constructed and added to the object under a key defined by its namespace.
	 *
	 * The source object must have an instance variable called `mixins` that contains an array of mixins to apply. Mixins are applied in the order that they are given.
	 *
	 * Every class in the array must inherit from `Mixin` class and override its `_namespace` property.
	 *
	 * After every mixin has been applied, the `mixin` property will be deleted from the source object.
	 *
	 * @method Whirl.mixins.Mixin.apply
	 *
	 * @param {object} object Instance of an object to apply the set of mixins to.
	 * @param {Whirl.mixins.Mixin[]} [mixins] Provide the array of mixins explicitly instead of looking for the `mixins` property on the source object.
	 *
	 * @example
	 * const {mixins: {Mixin, Event}} = Whirl;
	 *
	 * // Add the `Event` mixin to `MyObject`
	 * class MyObject {
	 * 	mixins = [Event];
	 *
	 * 	constructor() {
	 * 		Mixin.apply(this);
	 * 	}
	 * }
	 *
	 * @example
	 * const {mixins: {Mixin, Event}} = Whirl;
	 *
	 * // Add the `Event` mixin to `MyObject` explicitly
	 * class MyObject {
	 * 	constructor() {
	 * 		Mixin.apply(this, [Event]);
	 * 	}
	 * }
	 */
	static apply(object, mixinList) {
		const mixins = mixinList || object.mixins;

		if (!mixins || !Array.isArray(mixins) || !mixins.every((m) => m.prototype instanceof Mixin)) {
			throw new Error("Whirl | Invalid mixin type and/or format provided to `Mixin.apply`.");
		}

		mixins.forEach((mixin) => {
			// Enforce namespace
			if (!mixin._namespace) {
				throw new Error(`Whirl | Mixin "${mixin.name}" has no namespace.`);
			}

			// Create and add mixin instance to object under its namespace
			object[mixin._namespace] = new mixin(object);
		});

		// Remove unused 'mixins' property if it exists
		delete object.mixins;
	}
}

export const apply = {Mixin};
export default Mixin;
