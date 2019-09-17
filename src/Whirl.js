class Whirl {
	// Constants
	static _version = "0.1.0";

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
