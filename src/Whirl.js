// Managers
const ObjectManager = require("./managers/Object/");

// Objects
const Base = require("./objects/Base/");

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

	// Objects
	static Base = Base;
}

global.Whirl = Whirl;
module.exports = Whirl;
