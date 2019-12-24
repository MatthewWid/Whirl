/**
 * Prevent items being added as a child of the given object with the ChildMixin that do not inherit from a given class.
 *
 * @ignore
 *
 * @param {object} instance Current instance object that owns the ChildMixin that will contain the potential child.
 * @param {string} name Human-readable name of the instance of object for use in debugging.
 * @param {object} inheritClass Class that the potential child must inherit from to be added successfully.
 */
const addInheritFilter = (instance, name, inheritClass) => {
	return (object) => {
		if (object instanceof inheritClass) {
			object.parent = instance;
		} else {
			instance._game.debug.warn(
				`Objects added to a ${name} must inherit from the Entity class. Rejecting attempt to add object as child.`,
				`Whirl.${name}`
			);

			return false;
		}
	};
};

module.exports = addInheritFilter;
