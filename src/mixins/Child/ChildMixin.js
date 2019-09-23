const Mixin = require("../Mixin.js");

class ChildMixin extends Mixin {
	static _namespace = "child";

	_children = [];

	add(object) {
		if (Array.isArray(object)) {
			if (!object.every((o) => this.validate(o))) {
				console.warn("Whirl | ChildMixin | All child objects must satisfy the validation check to be added.");
				
				return this._source;
			}

			object.forEach((o) => {
				this.add(o);
			});
		} else {
			if (!this.validate(object)) {
				console.warn("Whirl | ChildMixin | Child object does not satisfy the validation check and will not be added.");
				
				return this._source;
			}

			this._children.push(object);
		}

		return this._source;
	}

	get(filter) {
		if (filter) {
			return [...this._children.filter(filter)];
		}

		return [...this._children];
	}

	remove() {
		this._children.length = 0;
	}

	// Abstract - To override
	// Validate if child can be added to child list
	validate(object) {
		return true;
	}
}

module.exports = ChildMixin;
