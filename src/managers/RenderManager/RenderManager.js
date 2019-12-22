const Manager = require("../Manager.js");
const {Renderer, CanvasRenderer, WebglRenderer} = require("../../render/");

/**
 * @classdesc
 * The render manager handles the batching of renders and dispatches it to the given render system (either canvas, WebGL, or something else).
 *
 * In normal use you'll never need to interact with the render manager directly, instead simply change how the objects in the game world look and the changes will automatically be reflected in the rendered result.
 *
 * This manager is stored under the `render` namespace of the game instance object.
 *
 * @class RenderManager
 * @memberof Whirl.Game
 */
class RenderManager extends Manager {
	_renderer = null;

	constructor(game) {
		super(game);

		const ConfigRenderer = game.config.get("renderer");

		this._renderer = ConfigRenderer instanceof Renderer || new CanvasRenderer(game);

		game.config.set("renderer", this._renderer);
	}
}

module.exports = RenderManager;
