/**
 * Library of shape classes that can be used for things like geometry, pointer locations, collision detection, sprite, viewport and stage boundaries and more.
 *
 * Game classes utilise shapes internally for a myriad of functions such as bounding boxes, geometry comparisons and more.
 *
 * Shape classes are exported with a factory function so you can just call the class as a function and it will return a new instance. If you still need access to underlying class itself, access the `_class` property of the given class you need.
 *
 * @namespace shapes
 * @memberof Whirl
 */
module.exports = {
	Circle: require("./Circle.js"),
	Line: require("./Line.js"),
	Rectangle: require("./Rectangle.js"),
	Point: require("./Point.js"),
};
