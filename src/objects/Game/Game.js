const {
	Mixin: {apply: mixin},
	Event,
} = require("../../mixins/");
const {
	ConfigManager,
	ObjectManager,
	UpdateManager,
	RenderManager,
	DebugManager,
} = require("./managers/");
const Base = require("../Base");
const Viewport = require("../Viewport");
const Stage = require("../Stage");
const Sprite = require("../Sprite");
const Container = require("../Container");
const Colour = require("../Colour");

/**
 * @classdesc
 * Represents an instance of a Whirl game.
 *
 * The game object is the actual running game and is the workforce of the engine that handles all updates, rendering and object management. It contains various managers for game updates, rendering, mouse and keyboard input, object storage and manipulation, asset handling, physics and more.
 *
 * The game can be configured during its initialisation and will perform certain setup operations for you if you configure it do so (Eg, set or create a canvas, set physics and rendering, set scaling modes, etc.).
 *
 * The game object should be constructed using the `Whirl.Game` factory method, but the underlying class can be accessed with the `Whirl.Game._class` property.
 *
 * @class Game
 * @memberof Whirl
 * @mixes Whirl.mixins.Event
 *
 * @param {object} [options] Options passed during setup. All properties on this object will be forwarded to the {@link Whirl.Game.ConfigManager|ConfigManager} and set as properties of the configuration map by implicitely calling {@link Whirl.Game.ConfigManager#set|the set method}.
 *
 * @example
 * const game = Whirl.Game({
 * 	"canvas": "#myCanvas",
 * 	"debug": true,
 * });
 *
 * game.start();
 */
class Game {
	mixins = [Event];

	/**
	 * The configuration manager that handles initial and continuing configuration of the game and its managers.
	 *
	 * @name config
	 * @memberof Whirl.Game#
	 * @type {Whirl.Game.ConfigManager}
	 */

	/**
	 * The object manager that handles all existing objects in the game and the initialisation of those objects.
	 *
	 * @name object
	 * @memberof Whirl.Game#
	 * @type {Whirl.Game.ObjectManager}
	 */

	/**
	 * The update manager that handles the game update loop including object management, game scaling, physics and more.
	 *
	 * @name update
	 * @memberof Whirl.Game#
	 * @type {Whirl.Game.UpdateManager}
	 */

	/**
	 * The render manager that handles the render loop including canvas and WebGL abstraction, render batching, and all visuals invoked by the update loop.
	 */

	/**
	 * The debug manager that handles debugging features such as logging, warnings and errors.
	 *
	 * @name debug
	 * @memberof Whirl.Game#
	 * @type {Whirl.Game.DebugManager}
	 */

	/**
	 * Alias to the {@link Whirl.Game.UpdateManager#start|UpdateManager#start method}.
	 *
	 * @method Whirl.Game#start
	 */

	/**
	 * Alias to the {@link Whirl.Game.UpdateManager#stop|UpdateManager#stop method}.
	 *
	 * @method Whirl.Game#stop
	 */

	constructor(options = {}) {
		mixin(this);

		// Managers
		this.config = new ConfigManager(this);
		this.config.set(options);
		this.debug = new DebugManager(this);
		this.object = new ObjectManager(this);
		this.update = new UpdateManager(this);
		this.render = new RenderManager(this);

		// Expose manager methods at top-level
		this.start = this.update.start;
		this.stop = this.update.stop;
	}

	// Game Object Factories
	Viewport = (...args) => new Viewport(this, ...args);
	Stage = (...args) => new Stage(this, ...args);
	Sprite = (...args) => new Sprite(this, ...args);
	Container = (...args) => new Container(this, ...args);
	Colour = (...args) => new Colour(this, ...args);
}

module.exports = (...args) => new Game(...args);
module.exports._class = Game;
