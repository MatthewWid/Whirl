import * as math from "~/math";
import * as easing from "~/easing";
import * as util from "~/util";
import * as key from "~/key";
import * as geometry from "~/geometry";
import * as mixins from "~/mixins";
import * as render from "~/render";
import {
	Game,
	Viewport,
	Stage,
	Sprite,
	Container,
	Colour,
	Gradient,
	Base,
	Entity,
	Texture,
} from "~/objects";

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
	static version = "0.3.0-alpha.10";

	// Static Modules
	static math = math;
	static easing = easing;
	static util = util;
	static key = key;
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
	static render = render;

	/**
	 * Creates a new Whirl game instance, passing the arguments directly to the {@link Whirl.Game|game class's constructor}.
	 *
	 * @memberof Whirl
	 * @function
	 * @returns {Whirl.Game}
	 */
	static createGame = (...args) => new Game(...args);
}

global.Whirl = Whirl;

export default Whirl;
