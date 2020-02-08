const Manager = require("../Manager.js");
const {Renderer, CanvasRenderer, WebglRenderer} = require("../../../../render/");
const Sprite = require("../../../Sprite/");

/**
 * @classdesc
 * The render manager handles the batching of renders and dispatches it to the given render system (either canvas, WebGL, or something else).
 *
 * In normal use you'll never need to interact with the render manager directly, instead simply change how the objects in the game world look and the changes will automatically be reflected in the rendered result.
 *
 * @class RenderManager
 * @memberof Whirl.Game
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
				game.debug.warn(
					"Invalid render system given during game instantiation.",
					"Whirl.Game#RenderManager"
				);
			}

			this.renderer = new CanvasRenderer(game);
		}

		game.config.set("renderer", this.renderer);
	}

	/**
	 * Process and render one frame from the current game state.
	 *
	 * @ignore
	 * @method Whirl.Game.RenderManager#_render
	 *
	 * @emits Whirl.Game#willRender
	 * @emits Whirl.Game#didRender
	 */
	_render() {
		/**
		 * Fires after the update loop has completed but before any rendering has taken place.
		 *
		 * @event Whirl.Game#willRender
		 * @type {object}
		 */
		this.game.event.emit("willRender");

		const viewports = this.game.object._viewports;

		this.renderer.preRenderAll(viewports);

		for (let i = 0; i < viewports.length; i++) {
			this._Viewport(viewports[i]);
		}

		this.renderer.postRenderAll(viewports);

		/**
		 * Fires after the render step of the game has concluded.
		 *
		 * @event Whirl.Game#didRender
		 * @type {object}
		 */
		this.game.event.emit("didRender");
	}

	/**
	 * Render a single Viewport.
	 *
	 * @ignore
	 * @method Whirl.Game.RenderManager#_Viewport
	 *
	 * @param {Whirl.Viewport} viewport Viewport to render.
	 */
	_Viewport(viewport) {
		const renderables = viewport.getRenderables();

		this.renderer.preRenderViewport(viewport);

		for (let i = 0; i < renderables.length; i++) {
			if (renderables[i] instanceof Sprite) {
				this.renderer.Sprite(viewport, renderables[i]);
			}
		}

		this.renderer.postRenderViewport(viewport);
	}
}

module.exports = RenderManager;
