/**
 * Get the value of a property from a given object.
 * 
 * @ignore
 * 
 * @param {Object} object Object to get the value from
 * @param {string} property Property to retrieve from the given object.
 * @param {any} [defaultValue=null] Value to return if no property was found on the object.
 * @returns {any}
 */
const getValue = (object, property, defaultValue = null) => (
	object.hasOwnProperty(property) ? object[property] : defaultValue
);

module.exports = getValue;
