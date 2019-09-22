const Mixin = require("../Mixin.js");
const Base = require("../../objects/Base/");

class ChildMixin extends Mixin {
	static _namespace = "child";

	_children = [];

	add(object) {
		if (Array.isArray(object)) {
			if (!object.every((o) => o instanceof Base)) {
				console.warn("Whirl | ChildMixin | All child objects must inherit from the Base class or cannot be added.");
				
				return this._source;
			}

			object.forEach((o) => {
				this.add(o);
			});
		} else {
			// Todo: Enforce extending Renderable/Entity/Sprite class instead of Base
			if (!(object instanceof Base)) {
				console.warn("Whirl | ChildMixin | Child object does not inherit from the Base class and will not be added.");
				
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
}

module.exports = ChildMixin;
