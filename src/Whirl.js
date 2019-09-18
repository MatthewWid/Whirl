class Whirl {
	// Constants
	static _version = "3.0.0-alpha.1";

	// Static Modules
	static math = require("./math/");
	static easing = require("./easing/");
	static util = require("./util/");
	static keys = require("./keys/");
	static shapes = require("./shapes/");

	// Game Objects
	static Game = require("./objects/Game/");
	static Base = require("./objects/Base/");
	static Viewport = require("./objects/Viewport/");
}

global.Whirl = Whirl;
module.exports = Whirl;
