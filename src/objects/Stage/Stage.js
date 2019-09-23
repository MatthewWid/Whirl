const Base = require("../Base/");
const Entity = require("../Entity/");
const {Mixin: {apply: mixin}, Child} = require("../../mixins/");
const {Rectangle} = require("../../shapes/");

class Stage extends Base {
	mixins = [Child];
	limit;

	constructor(game, options = {}) {
		super(game);

		mixin(this);

		this.child.validate = (object) => object instanceof Entity._class;

		if (options.limit instanceof Rectangle._class) {
			this.limit = options.limit;
		} else {
			this.limit = Rectangle(
				options.x || 0,
				options.y || 0,
				options.w || 0,
				options.h || 0,
			);
		}
	}
}

module.exports = (...args) => new Stage(...args);
module.exports._class = Stage;
