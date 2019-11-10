const {Mixin: {apply: mixin}, Event} = require("../../mixins/");
const {
	ConfigManager,
	UpdateManager,
	ObjectManager,
	DebugManager
} = require("../../managers/");

/**
 * @classdesc
 * Represents an instance of a Whirl game.
 * 
 * The game object is the actual running game and is the workforce of the engine that handles all updates, rendering and object management. It contains various managers for game updates, rendering, mouse and keyboard input, object storage and manipulation, asset handling, physics and more.
 * 
 * The game can be configured during its initialisation and will perform certain setup operations for you if you configure it do so (Eg, set or create a canvas, set physics and rendering, set scaling modes, etc.).
 * 
 * The game object should be constructed using the `Whirl.Game` factory method, but the underlying class can be accessed with `Whirl.Game._class`.
 * 
 * @class Game
 * @memberof Whirl
 * @mixes Whirl.mixins.Event
 * 
 * @example
 * const game = Whirl.Game({
 * 	canvas: "myCanvas"
 * });
 */
class Game {
	mixins = [Event];

	/**
	 * The configuration manager that handles initial and continuing configuration of the game and its managers.
	 * 
	 * @memberof Whirl.Game#
	 */
	config = new ConfigManager(this);
	
	/**
	 * The update manager that handles the game update loop including object management, game scaling, physics and more.
	 * 
	 * @memberof Whirl.Game#
	 */
	update = new UpdateManager(this);

	/**
	 * The object manager that handles all existing objects in the game and the initialisation of those objects.
	 * 
	 * @memberof Whirl.Game#
	 */
	object = new ObjectManager(this);

	/**
	 * The debug manager that handles debugging features such as logging, warnings and errors.
	 * 
	 * @memberof Whirl.Game#
	 */
	debug = new DebugManager(this);

	constructor(options = {}) {
		mixin(this);
		
		// Configuration
		this.config.set(options);

		// Expose manager methods at top-level
		this.start = this.update._start;
		this.stop = this.update._stop;
	}
}

module.exports = (...args) => new Game(...args);
module.exports._class = Game;
