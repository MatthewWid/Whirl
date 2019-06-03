/*
	Abstracts object management of the globalStorage and object managers.
*/

const objectManager = {
	// Get all
	getAll: (objects, query) => objects,
	// Get by Object.name
	getByName: (objects, query) => objects.filter((e) => e.name === query),
	// Get by Object._id
	getById: (objects, query) => objects.filter((e) => e._id === query),
	// Get by Object._type
	getByType: (objects, query) => objects.filter((e) => e._type === query)
}

/*
	_obj - Object that the methods should be attached to.
	objectList - Array of objects to search.
*/
module.exports = (_obj, objectList) => {
	Object.keys(objectManager).forEach((e) => {
		_obj[e] = (...args) => objectManager[e](objectList, ...args);
	});
};
