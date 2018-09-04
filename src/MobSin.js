// MobSin.js v0.0.1
// By MatthewWid

let MobSin = {};

MobSin = {
	eventSystem: require("./eventSystem"), // Custom events
	childSystem: require("./childSystem"), // Tree of parent-children system
	math: require("./math"), // Math functions
	util: require("./util"), // Utility functions
	shapes: require("./shapes"), // Shapes and geometry
	text: require("./text"), // Advanced text
	container: require("./container"), // Generic game container object
};

// A game instance that is passed the MobSin container's base functions
MobSin.game = require("./game")(MobSin);

module.exports = MobSin;
global.MobSin = MobSin;