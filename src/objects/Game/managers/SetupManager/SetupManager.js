import Manager from "../Manager";
import Stage from "~/objects/Stage";
import Viewport from "~/objects/Viewport";

/**
 * Handles initial game setup including persistant storage checks, network and Internet connectivity checks, canvas creation, default values for other managers and more.
 *
 * During setup, performs the following operations in order:
 *
 * 1. If there is {@link Whirl.Game.ConfigManager#canvas|no default canvas set in the configuration}, will insert (append) a canvas element (with ID `whirl-canvas-default`) into {@link Whirl.Game.ConfigManager#root|the root element} (that defaults to the `<body>` element) and sets the `canvas` configuration variable to the ID selector of the created canvas.
 * 2. Creates a {@link Whirl.Stage|Stage} object and a {@link Whirl.Viewport|Viewport} that contains it, (both with dimensions `640x480`) and resizes the canvas to the size of the Viewport.
 * 3. Sets the {@link Whirl.Game.ConfigManager#setup|`setup` configuration variable} to `false` to block subsequent `setup` calls.
 * 4. Emits {@link Whirl.Game#event:didSetup|the didSetup event}.
 *
 * Once setup is complete, subsequent calls to the {@link Whirl.Game.SetupManager#setup|setup method} or the {@link Whirl.Game#start|Game#start method} will not start setup again.
 *
 * Using the automated setup manager is optional. If you wish to create all of the foundational game objects from scratch, simply disable the `setup` property when making your game instance (`const game = Whirl.Game({setup: false})`).
 *
 * @class SetupManager
 * @memberof Whirl.Game
 *
 * @example
 * // Create a red Sprite and add it to the game world
 * function setup({stage, viewport, game}) {
 * 	const {Sprite, Colour} = game;
 *
 * 	stage.child.add([
 * 		Sprite({
 * 			bounds: Rectangle(200, 200, 50, 50),
 * 			fill: Colour(200, 0, 0),
 * 		}),
 * 	]);
 * }
 *
 * // Create a game instance, allowing automatic setup to take place
 * const game = Whirl.Game()
 * 	.event.once("didSetup", setup)
 * 	.start();
 *
 * @example
 * // Equivalent to the previous example, but doesn't use the `didSetup` event
 *
 * const game = {Sprite, Colour, setup: {stage}} = Whirl.Game()
 * 	.setup.setup();
 *
 * stage.child.add([
 * 	Sprite({
 * 		bounds: Rectangle(200, 200, 50, 50),
 * 		fill: Colour(200, 0, 0)
 * 	}),
 * ]);
 *
 * game.start();
 */
class SetupManager extends Manager {
	/**
	 * Stage object created by the SetupManager during setup.
	 *
	 * This can be used to access the generated Stage directly, instead of getting it from the {@link Whirl.Game#event:didSetup|didSetup} event.
	 *
	 * Only stores the Stage created by the {@link Whirl.Game.SetupManager#setup|setup method}, not any custom stages you may create afterwards.
	 *
	 * @memberof Whirl.Game.SetupManager#
	 * @type {Whirl.Stage}
	 * @default null
	 */
	stage = null;

	/**
	 * Viewport object created by the SetupManager during setup.
	 *
	 * This can be used to access the generated Viewport directly, instead of getting it from the {@link Whirl.Game#event:didSetup|didSetup} event.
	 *
	 * Only stores the Viewport created by the {@link Whirl.Game.SetupManager#setup|setup method}, not any custom viewports you may create afterwards.
	 *
	 * @memberof Whirl.Game.SetupManager#
	 * @type {Whirl.Viewport}
	 * @default null
	 */
	viewport = null;

	/**
	 * Fires after game setup has completed and the game loop has been started.
	 *
	 * Will not fire if the {@link Whirl.Game.ConfigManager#setup|`setup` configuration variable} is set to `false`.
	 *
	 * @event Whirl.Game#didSetup
	 * @type {object}
	 *
	 * @property {Whirl.Game} game Current game instance.
	 * @property {Whirl.Stage} stage Generated stage that holds all of the {@link Whirl.Entity|entities} that exist in the game world.
	 * @property {Whirl.Viewport} viewport Generated viewport that contains the Stage and is used for rendering onto the canvas.
	 * @property {string} canvas Selector for {@link Whirl.Game.ConfigManager#canvas|the default canvas element} being rendered to.
	 * @property {string} root Selector the {@link Whirl.Game.ConfigManager#root|the root element} that contains the game canvasses.
	 */

	/**
	 * Initiate the setup process for the game instance.
	 *
	 * Does nothing if {@link Whirl.Game.ConfigManager#setup|the `setup` configuration variable} is `false`.
	 *
	 * Implicitly called {@link Whirl.Game#start|by the Game#start method}. In general, you shouldn't need to invoke this method directly.
	 *
	 * @method Whirl.Game.SetupManager#setup
	 *
	 * @returns {Whirl.Game} Game instance the SetupManager belongs to.
	 *
	 * @emits Whirl.Game#event:didSetup
	 */
	setup() {
		const {config} = this.game;

		if (!config.get("setup")) {
			return this.game;
		}

		// Find if default canvas already set
		const canvasSelector = config.get("canvas");
		const canvasElement = document.querySelector(canvasSelector);

		// If no default canvas exists, create a new one
		if (!canvasElement) {
			// Insert it into the `root` element
			const rootSelector = config.get("root");
			const rootElement = document.querySelector(rootSelector);

			const newCanvas = document.createElement("canvas");
			newCanvas.id = "whirl-canvas-default";

			rootElement.appendChild(newCanvas);

			// Set the default canvas in the ConfigManager
			config.set("canvas", `#${newCanvas.getAttribute("id")}`);
		}

		const stage = new Stage(this.game);

		this.stage = stage;

		const viewport = new Viewport(this.game, {
			resizeCanvas: true,
			stage,
		});

		this.viewport = viewport;

		config.set("setup", false);

		this.game.event.emit("didSetup", {
			game: this.game,
			stage,
			viewport,
			canvas: config.get("canvas"),
			root: config.get("root"),
		});

		return this.game;
	}
}

export default SetupManager;
