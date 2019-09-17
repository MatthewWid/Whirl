const UpdateManager = require("./managers/Update/");
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
	static shapes = require("./shapes/");

	// Game Objects
	static Base = require("./objects/Base/");

	// Managers
	update = new UpdateManager(this);
	object = new ObjectManager(this);

	constructor() {
		this.start = this.update._start;
		this.stop = this.update._stop;
	}
}

global.Whirl = Whirl;
module.exports = Whirl;
