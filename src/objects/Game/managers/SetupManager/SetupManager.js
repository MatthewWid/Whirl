const Manager = require("../Manager.js");
const Stage = require("../../../Stage/");
const Viewport = require("../../../Viewport/");

/**
 * Handles initial game setup including persistant storage checks, network and Internet connectivity checks, canvas creation, default values for other managers and more.
 *
 * During setup, performs the following operations in order:
 *
 * 1. If there is {@link Whirl.Game.ConfigManager#canvas|no default canvas set in the configuration}, will insert (append) a canvas element (with ID `whirl-canvas-default`) into {@link Whirl.Game.ConfigManager#root|the root element} (that defaults to the `<body>` element) and sets the `canvas` configuration variable to the ID selector of the created canvas.
 * 2. Creates a {@link Whirl.Stage|Stage} and {@link Whirl.Viewport|Viewport} object that contains it (both with dimensions `640x480`) and resizes the canvas to the size of the Viewport.
 * 3. Sets the {@link Whirl.Game.ConfigManager#setup|`setup` configuration variable} to `false` and {@link Whirl.Game.UpdateManager#start|starts the game loop}.
 * 4. Emits {@link Whirl.Game#event:didSetup|the didSetup event}.
 *
 * @class SetupManager
 * @memberof Whirl.Game
 */
class SetupManager extends Manager {
	/**
	 * @ignore
	 * @method Whirl.Game.SetupManager#setup
	 *
	 * @returns {Whirl.Game} Game instance the SetupManager belongs to.
	 */
	setup() {
		const {config} = this._game;

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

		const stage = new Stage(this._game, {
			w: 640,
			h: 480,
		});

		const viewport = new Viewport(this._game, {
			w: 640,
			h: 480,
			resize: true,
			stage,
		});

		config.set("setup", false);

		this._game.update.start();

		/**
		 * Fires after game setup has completed and the game loop has been started.
		 *
		 * @event Whirl.Game#didSetup
		 * @type {object}
		 *
		 * @property {string} canvas Selector for {@link Whirl.Game.ConfigManager#canvas|the default canvas element} being rendered to.
		 * @property {string} root Selector the {@link Whirl.Game.ConfigManager#root|the root element} that contains the game canvasses.
		 * @property {Whirl.Stage} stage Generated stage that holds all of the {@link Whirl.Entity|entities} that exist in the game world.
		 * @property {Whirl.Viewport} viewport Generated viewport that contains the Stage and is used for rendering onto the canvas.
		 */
		this._game.event.emit("didSetup", {
			canvas: config.get("canvas"),
			root: config.get("root"),
			stage,
			viewport,
		});

		return this._game;
	}
}

module.exports = SetupManager;