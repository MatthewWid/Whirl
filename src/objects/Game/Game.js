const {
	Mixin: {apply: mixin},
	Event,
} = require("../../mixins/");
const {ConfigManager, UpdateManager, ObjectManager, DebugManager} = require("../../managers/");
const Base = require("../Base");
const Viewport = require("../Viewport");
const Stage = require("../Stage");
const Entity = require("../Entity");
const Sprite = require("../Sprite");
const Texture = require("../Texture");
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
	 * @memberof Whirl.Game#
	 *
	 * @see Whirl.Game.ConfigManager
	 */
	config = new ConfigManager(this);

	/**
	 * The update manager that handles the game update loop including object management, game scaling, physics and more.
	 *
	 * @memberof Whirl.Game#
	 *
	 * @see Whirl.Game.UpdateManager
	 */
	update = new UpdateManager(this);

	/**
	 * The object manager that handles all existing objects in the game and the initialisation of those objects.
	 *
	 * @memberof Whirl.Game#
	 *
	 * @see Whirl.Game.ObjectManager
	 */
	object = new ObjectManager(this);

	/**
	 * The debug manager that handles debugging features such as logging, warnings and errors.
	 *
	 * @memberof Whirl.Game#
	 *
	 * @see Whirl.Game.DebugManager
	 */
	debug = new DebugManager(this);

	constructor(options = {}) {
		mixin(this);

		// Configuration
		this.config.set(options);

		// Expose manager methods at top-level
		this.start = this.update.start;
		this.stop = this.update.stop;
	}

	// Game Object Factories
	Viewport = (...args) => new Viewport(this, ...args);
	Stage = (...args) => new Stage(this, ...args);
	Sprite = (...args) => new Sprite(this, ...args);
	Colour = (...args) => new Colour(this, ...args);
}

module.exports = (...args) => new Game(...args);
module.exports._class = Game;
