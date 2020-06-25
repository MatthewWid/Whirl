/**
 * Get the value of a property from a given object, else return a default value.
 *
 * @ignore
 *
 * @param {object} object Object to get the value from
 * @param {string} property Property to retrieve from the given object.
 * @param {any} [defaultValue=null] Value to return if no property was found on the object.
 * @returns {any}
 */
const getValue = (object, property, defaultValue = null) =>
	Object.prototype.hasOwnProperty.call(object, property) ? object[property] : defaultValue;

export default getValue;
