const Base = require("../Base/");
const {Mixin: {apply: mixin}, Child} = require("../../mixins/");

class Stage extends Base {
	mixins = [Child];

	constructor(game, options = {}) {
		super(game);

		mixin(this);
	}
}

module.exports = (...args) => new Stage(...args);
module.exports._class = Stage;
