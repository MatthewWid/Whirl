/**
 * @classdesc
 * The base mixin class that all other mixin classes extend from. Used to apply mixins to custom objects and create your own custom mixins.
 * 
 * Mixins are typically not instantiated directly, but by the use of the `Mixin.apply` method.
 * 
 * See {@link Whirl.mixins|the mixin namespace overview for common use cases and examples of creating and using mixins}.
 * 
 * @class Mixin
 * @memberof Whirl.mixins
 * @abstract
 * 
 * @param {object} [source] Source object that this mixin must be applied to.
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
	 * The source object must have an instance variable `mixins` that contains an array of mixin constructors to apply. Mixins are applied in the order that they are given.
	 * 
	 * Every class in the array must inherit from this `Mixin` class and override its static `_namespace` property with a valid string value.
	 * 
	 * After every mixin has been applied then the `mixin` property will be removed from the source object.
	 * 
	 * @method Whirl.mixins.Mixin.apply
	 * 
	 * @param {object} object Instance of an object to apply the set of mixins to.
	 */
	static apply(object) {
		const {mixins} = object;

		if (
			!mixins ||
			!Array.isArray(mixins) ||
			!mixins.every((m) => m.prototype instanceof Mixin)
		) {
			throw new Error("Whirl | Invalid mixin type and/or format.");
		}

		mixins.forEach((mixin) => {
			// Enforce namespace
			if (!mixin._namespace) {
				throw new Error(`Whirl | Mixin "${mixin.name}" has no namespace.`);
			}

			// Create and add mixin instance to object as property under namespace
			object[mixin._namespace] = new mixin(object);
		});

		// Remove unused 'mixins' property
		delete object.mixins;
	}
}

module.exports = Mixin;
