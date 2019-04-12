// MobSin.systems.child

module.exports = (_game, _obj) => {
	_obj.children = [];

	_obj.child = {
		add: (newChild) => {
			if (typeof newChild == "object" && !Array.isArray(newChild)) {
				_obj.children.push(newChild);
			} else if (Array.isArray(newChild)) {
				for (let i = 0, n = newChild.length; i < n; i++) {
					_obj.child.add(newChild[i]);
				}
			}
			return _obj;
		},
		// Get specific child based on child name
		getByName: (query) => {
			return _obj.children.filter((e) => e.name === query);
		},
		getById: (query) => {
			return _obj.children.filter((e) => e._id === query);
		},
		// Get immediate children of object
		getAll: () => {
			return _obj.children;
		},
		getByIdDeep: (query, curr = _obj) => {
			if (query === curr._id) {
				return curr;
			}
			for (let i = 0, n = curr.children.length; i < n; i++) {
				const result = _obj.child.getByIdDeep(query, curr.children[i]);

				if (result !== false) {
					return result;
				}
			}
			return false;
		},
		// TODO:
		// Add an accumulator object for accumulating values on each level of children
		getAllDeep: (returnedChildren = []) => {
			// Get children from children
			for (let i = 0, n = _obj.children.length; i < n; i++) {
				if (_obj.children[i].child) {
					_obj.children[i].child.getAllDeep(returnedChildren);
				}
			}

			// Push direct children to returned objects array
			for (let i = 0, n = _obj.children.length; i < n; i++) {
				returnedChildren.push(_obj.children[i]);
			}

			return returnedChildren;
		}
	};
};
