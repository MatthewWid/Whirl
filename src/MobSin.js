// MobSin.js v0.0.1
// By MatthewWid

let MobSin = {
	game: require("./game"), // Game instance
	eventSystem: require("./eventSystem"),
	childSystem: require("./childSystem"),
	shapes: require("./shapes"), // Shapes and geometry
	text: require("./text") // Advanced text
};
MobSin.game.container = MobSin;

module.exports = MobSin;
global.MobSin = MobSin;