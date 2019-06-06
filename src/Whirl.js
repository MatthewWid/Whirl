// Whirl

const Whirl = {
	// Game functions and modules
	Game: require("./Game"), // Make a new game instance
	math: require("./math"), // Math functions
	util: require("./util"), // Utility functions
	easing: require("./easing"), // Tweening functions
	shapes: require("./shapes"), // Shapes and geometry

	// Object constructors
	Stage: require("./Stage"), // Stage
	Viewport: require("./Viewport"), // Viewport
	Camera: require("./Camera"), // Camera object
	Sprite: require("./Sprite"), // Sprites
	Container: require("./Container"), // Generic game container object
	Text: require("./Text"), // Advanced text

	// Hard constants
	STAGE: "_DEFAULTSTAGE",
	CAMERA: "_DEFAULTCAMERA",
	keys: require("./keys")
};

module.exports = Whirl;
global.Whirl = Whirl;
