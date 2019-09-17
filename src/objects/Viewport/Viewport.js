const Base = require("../Base/");
const {Rectangle, Point} = require("../../shapes/");

class Viewport extends Base {
	_canvas;
	_ctx;
	bounds;
	scroll;

	constructor(game) {
		super(game);
	}
}

module.exports = Viewport;
