class Whirl {
	static _version = "0.1.0";

	static math = require("./math/");
	static easing = require("./easing/");
	static util = require("./util/");
}

module.exports = Whirl;
global.Whirl = Whirl;
