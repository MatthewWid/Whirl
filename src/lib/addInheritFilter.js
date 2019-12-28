/**
 * Called when the object passes the filter successfully.
 *
 * @ignore
 *
 * @callback successCallback
 * @param {object} object Object that is guaranteed to inherit from the given class.
 */

/**
 * Prevent items being added as a child of the given object with the ChildMixin that do not inherit from a given class.
 *
 * @ignore
 *
 * @param {object} instance Current instance object that owns the ChildMixin that will contain the potential child.
 * @param {object} inheritClass Class that the potential child must inherit from to be added successfully.
 * @param {successCallback} success Callback that runs after the object is confirmed as inheriting from the given class.
 */
const addInheritFilter = (instance, inheritClass) => {
	return (object) => {
		if (object instanceof inheritClass) {
			object.parent = instance;
		} else {
			instance._game.debug.warn(
				`Objects added to a ${instance.constructor.name} must inherit from the ${inheritClass.name} class. Rejecting attempt to add object as child.`,
				`Whirl.${name}`
			);

			return false;
		}
	};
};

module.exports = addInheritFilter;
