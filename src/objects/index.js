const Base = require("./Base/");
const Entity = require("./Entity/");
Entity.Sprite = require("./Sprite/");
const Texture = require("./Texture/");

const Game = require("./Game/");
const Viewport = require("./Viewport/");
const Stage = require("./Stage/");
const Colour = require("./Colour");

module.exports = {
	// Base Classes for plugins
	// Exported as class directly
	Base,
	Entity,
	Texture,

	// Game objects for normal use
	// Exported as a factory function and a class indirectly
	Game,
	Viewport,
	Stage,
	Colour,
};
