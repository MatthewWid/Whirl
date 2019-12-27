/**
 * @classdesc
 * Abstract geometry class that represents a geometric shape, helper or item on a geometric plane.
 *
 * @abstract
 * @class Geometry
 * @memberof Whirl.geometry
 */
class Geometry {
	/**
	 * Set multiple properties of this object at once.
	 *
	 * Additional properties provided that do not already exist on the object or are marked as read-only will be disregarded.
	 *
	 * @abstract
	 * @method Whirl.geometry.Geometry#set
	 *
	 * @param {object} [properties] Properties to override the existing properties of this object with.
	 * @returns {this}
	 */
	set(properties = {}) {
		return this;
	}
}

module.exports = Geometry;
