const Manager = require("../Manager.js");
const Stage = require("../../../Stage/");
const Viewport = require("../../../Viewport/");

/**
 * Handles initial game setup including persistant storage checks, network and Internet connectivity checks, canvas creation, default values for other managers and more.
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
