/**
 * Library of classes that can be used for things like geometric calculations, pointer locations, collision detection, sprite, viewport and stage boundaries and more.
 *
 * Game classes utilise these classes internally for a myriad of functions such as bounding boxes, geometric comparisons and more.
 *
 * Geometry classes are exported with a factory function so you may call the class as a function and it will return a new instance. If you still need access to underlying class itself, access the `_class` property of the given class you need. For example, `Whirl.geometry.Circle._class`.
 *
 * @namespace geometry
 * @memberof Whirl
 */
module.exports = {
	Circle: require("./Circle/"),
	Line: require("./Line/"),
	Rectangle: require("./Rectangle/"),
	Point: require("./Point/"),
};
