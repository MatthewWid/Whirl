// MobSin.shapes

let shapes = {
	rectangle: require("./rectangle"),
	circle: require("./circle")
};
shapes.rect = shapes.Rectangle;
shapes.circ = shapes.Circle;

module.exports = shapes;