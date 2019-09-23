// Get a value from a given property of a given object
// If the property does not exist, return the default value
const getValue = (object, property, defaultValue = null) => (
	object.hasOwnProperty(property) ? object[property] : defaultValue
);

module.exports = getValue;
