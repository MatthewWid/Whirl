const Base = require("../Base/");
const getValue = require("../../lib/getValue.js");

class Entity extends Base {
	alpha;
	scale;
	layer;
	body;

	constructor(game, options = {}) {
		super(game);

		this.alpha = getValue(options, "alpha", 1);

		this.scale = getValue(options, "scale", 1);

		this.layer = getValue(options, "layer", 0);

		this.body = getValue(options, "body");
	}

	_update() {}

	_render() {}
}

module.exports = Entity;
