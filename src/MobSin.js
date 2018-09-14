// MobSin.js
// By MatthewWid

let MobSin = {
	// Game functions and modules
	game: require("./game"), // Game instance
	math: require("./math"), // Math functions
	util: require("./util"), // Utility functions
	shapes: require("./shapes"), // Shapes and geometry

	systems: {
		event: require("./systems/event"),
		child: require("./systems/child")
	},

	// Object constructors
	Camera: require("./Camera"), // Camera object
	Container: require("./Container"), // Generic game container object
	Sprite: require("./Sprite"), // Sprites
	Text: require("./Text"), // Advanced text

	// Hard constants
	STAGE: "_DEFAULTSTAGE",
	CAMERA: "_DEFAULTCAMERA"
};

module.exports = MobSin;
global.MobSin = MobSin;