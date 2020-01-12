const Base = require("./Base/");
const Entity = require("./Entity/");
const Texture = require("./Texture/");

const Game = require("./Game/");
const Viewport = require("./Viewport/");
const Stage = require("./Stage/");
const Sprite = require("./Sprite/");
const Container = require("./Container/");
const Colour = require("./Colour");
const Gradient = require("./Gradient");

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
	Sprite,
	Container,
	Colour,
	Gradient,
};
