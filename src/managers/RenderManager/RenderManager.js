const Manager = require("../Manager.js");
const {Renderer, CanvasRenderer, WebglRenderer} = require("../../render/");

/**
 * @classdesc
 * The render manager handles the batching of renders and dispatches it to the given render system (either canvas, WebGL, or something else).
 *
 * In normal use you'll never need to interact with the render manager directly, instead simply change how the objects in the game world look and the changes will automatically be reflected in the rendered result.
 *
 * @class RenderManager
 * @memberof Whirl.Game#
 */
class RenderManager extends Manager {
	/**
	 * Rendering system to use to draw things onto the screen.
	 *
	 * This value is set during the game instantiation process and should never be changed henceforth.
	 *
	 * {@link Whirl.Game.ConfigManager#renderer|You can provide your own render during game setup via the ConfigManager.}
	 *
	 * @memberof Whirl.Game.RenderManager#
	 * @type {Whirl.render.Renderer}
	 * @default {@link Whirl.render.Canvas}
	 * @readonly
	 */
	renderer = null;

	constructor(game) {
		super(game);

		const ConfigRenderer = game.config.get("renderer");

		if ((ConfigRenderer || {}).prototype instanceof Renderer) {
			this.renderer = new ConfigRenderer(game);
		} else {
			if (ConfigRenderer) {
				game.debug.warn("Invalid render system given during game instantiation.", "RenderManager");
			}

			this.renderer = new CanvasRenderer(game);
		}

		game.config.set("renderer", this.renderer);
	}
}

module.exports = RenderManager;
