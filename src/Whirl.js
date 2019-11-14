const math = require("./math/");
const easing = require("./easing/");
const util = require("./util/");
const keys = require("./keys/");
const shapes = require("./shapes/");
const mixins = require("./mixins/");
const {
	Game,
	Base,
	Viewport,
	Stage,
	Entity,
	Texture,
	Colour,
} = require("./objects/");

/**
 * The global Whirl object that all constants, modules and game objects are attached to and derived from.
 * 
 * @global
 * @namespace Whirl
 * 
 */
class Whirl {
	/**
	 * Denotes the current version of Whirl being used.
	 * 
	 * @memberof Whirl
	 * @type {string}
	 * @static
	 */
	static _version = "3.0.0-alpha.1";

	// Static Modules
	static math = math;
	static easing = easing;
	static util = util;
	static keys = keys;
	static shapes = shapes;
	static mixins = mixins;

	// Game Objects
	static Game = Game;
	static Base = Base;
	static Viewport = Viewport;
	static Stage = Stage;
	static Entity = Entity;
	static Texture = Texture;
	static Colour = Colour;
}

global.Whirl = Whirl;
module.exports = Whirl;
