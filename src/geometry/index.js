/**
 * Library of classes that can be used for things like geometric calculations, pointer locations, collision detection, sprite, viewport and stage boundaries and more.
 *
 * Game classes utilise these classes internally for a myriad of functions such as bounding boxes, geometric comparisons and more.
 *
 * Geometry classes are exported with a factory function so you may call the class as a function and it will return a new instance. If you still need access to underlying class itself, access the `class` property. For example, `Whirl.geometry.Circle.class`.
 *
 * @namespace geometry
 * @memberof Whirl
 */
export {default as Geometry} from "./Geometry";
export {default as Circle} from "./Circle";
export {default as Line} from "./Line";
export {default as Rectangle} from "./Rectangle";
export {default as Point} from "./Point";
