const ObjectManager = require("./managers/Object/");

class Whirl {
	// Constants
	static _version = "0.1.0";
	static STAGE = "_DEFAULTSTAGE";
	static CAMERA = "_DEFAULTCAMERA";

	// Static Modules
	static math = require("./math/");
	static easing = require("./easing/");
	static util = require("./util/");
	static keys = require("./keys/");

	// Managers
	object = new ObjectManager(this);

	// Game Objects
	static Base = require("./objects/Base/");

	// Static Objects
	static shapes = require("./shapes/");
}

global.Whirl = Whirl;
module.exports = Whirl;
