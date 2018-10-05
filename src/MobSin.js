// MobSin.js
// By MatthewWid

let MobSin = {
	// Game functions and modules
	Game: require("./Game"), // Make a new game instance
	math: require("./math"), // Math functions
	util: require("./util"), // Utility functions
	easing: require("./easing"), // Tweening functions
	shapes: require("./shapes"), // Shapes and geometry

	// Object constructors
	Camera: require("./Camera"), // Camera object
	Container: require("./Container"), // Generic game container object
	Sprite: require("./Sprite"), // Sprites
	Text: require("./Text"), // Advanced text

	// Hard constants
	STAGE: "_DEFAULTSTAGE",
	CAMERA: "_DEFAULTCAMERA",
	keys: require("./keys")
};

module.exports = MobSin;
global.MobSin = MobSin;