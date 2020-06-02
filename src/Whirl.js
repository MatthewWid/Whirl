const math = require("./math/");
const easing = require("./easing/");
const util = require("./util/");
const keys = require("./keys/");
const geometry = require("./geometry/");
const mixins = require("./mixins/");
const Game = require("./objects/Game/");
const Viewport = require("./objects/Viewport/");
const Stage = require("./objects/Stage/");
const Sprite = require("./objects/Sprite/");
const Container = require("./objects/Container/");
const Colour = require("./objects/Colour/");
const Gradient = require("./objects/Gradient/");
const Base = require("./objects/Base/");
const Entity = require("./objects/Entity/");
const Texture = require("./objects/Texture/");
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
	static version = "0.3.0-alpha.8";

	// Static Modules
	static math = math;
	static easing = easing;
	static util = util;
	static keys = keys;
	static geometry = geometry;
	static mixins = mixins;

	// Game Objects
	static Game = Game;
	static Viewport = Viewport;
	static Stage = Stage;
	static Sprite = Sprite;
	static Container = Container;
	static Colour = Colour;
	static Gradient = Gradient;
	static Base = Base;
	static Entity = Entity;
	static Texture = Texture;

	// Render Systems
	static render = {
		Renderer: Renderer,
		Canvas: CanvasRenderer,
		Webgl: WebglRenderer,
	};

	static createGame = (...args) => new Game(...args);
}

global.Whirl = Whirl;
module.exports = Whirl;
