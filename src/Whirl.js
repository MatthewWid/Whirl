// Whirl

const Whirl = {
	// Game functions and modules
	math: require("./math"), // Math functions
	util: require("./util"), // Utility functions
	easing: require("./easing"), // Tweening functions
	shapes: require("./shapes"), // Shapes and geometry

	// Object constructors
	Game: require("./Game"), // Make a new game instance
	Stage: require("./objects/Stage"), // Stage
	Viewport: require("./objects/Viewport"), // Viewport
	Camera: require("./objects/Camera"), // Camera object
	Sprite: require("./objects/Sprite"), // Sprites
	Container: require("./objects/Container"), // Generic game container object
	Text: require("./objects/Text"), // Advanced text

	// Hard constants
	STAGE: "_DEFAULTSTAGE",
	CAMERA: "_DEFAULTCAMERA",
	keys: require("./keys")
};

module.exports = Whirl;
global.Whirl = Whirl;
