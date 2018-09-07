// MobSin.js
// By MatthewWid

let MobSin = {
	// Game functions and modules
	game: require("./game"), // Game instance
	eventSystem: require("./eventSystem"), // Custom events
	childSystem: require("./childSystem"), // Tree of parent-children system
	math: require("./math"), // Math functions
	util: require("./util"), // Utility functions
	shapes: require("./shapes"), // Shapes and geometry
	text: require("./text"), // Advanced text

	// Object constructors
	Camera: require("./Camera"), // Camera object
	Container: require("./Container"), // Generic game container object
	Sprite: require("./Sprite"),

	// Hard constants
	STAGE: "_DEFAULTSTAGE",
	CAMERA: "_DEFAULTCAMERA"
};

module.exports = MobSin;
global.MobSin = MobSin;