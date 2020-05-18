const math = require("./math/");
const easing = require("./easing/");
const util = require("./util/");
const keys = require("./keys/");
const geometry = require("./geometry/");
const mixins = require("./mixins/");
const {
	Base,
	Entity,
	Texture,
	Game,
	Viewport,
	Stage,
	Sprite,
	Container,
	Colour,
	Gradient,
} = require("./objects/");
const {Renderer, CanvasRenderer, WebglRenderer} = require("./render/");

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
	static version = "0.3.0-alpha.6";

	// Static Modules
	static math = math;
	static easing = easing;
	static util = util;
	static keys = keys;
	static geometry = geometry;
	static mixins = mixins;

	// Game Objects
	static Game = Game;
	static Base = Base;
	static Viewport = Viewport;
	static Stage = Stage;
	static Sprite = Sprite;
	static Container = Container;
	static Entity = Entity;
	static Texture = Texture;
	static Colour = Colour;
	static Gradient = Gradient;

	// Render Systems
	static render = {
		Renderer: Renderer,
		Canvas: CanvasRenderer,
		Webgl: WebglRenderer,
	};
}

global.Whirl = Whirl;
module.exports = Whirl;
