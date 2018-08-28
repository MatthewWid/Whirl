// MobSin.childSystem

module.exports = (_obj) => {
	_obj.children = [];

	_obj.child = _obj.c = {
		add: (newChild) => {
			if (typeof newChild == "object" && !Array.isArray(newChild)) {
				let newInd = _obj.children.push(
					newChild
				) - 1;
				return _obj.children[newInd];
			} else if (Array.isArray(newChild)) {
				console.log("ADDING NEW ARRAY");
				let newChildrenArr = [];
				for (let i = 0, n = newChild.length; i < n; i++) {
					newChildrenArr.push(
						_obj.child.add(newChild[i])
					);
				}
				return newChildrenArr;
			}
		},
		get: (name) => {
			return _obj.children.find((e) => e.name == name);
		},
		getAll: () => {
			return _obj.children;
		}
	};
};