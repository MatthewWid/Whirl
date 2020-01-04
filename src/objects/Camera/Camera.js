const Base = require("../Base/");

/**
 * @classdesc
 * Cameras are the view into the game world.
 *
 * Cameras can be scrolled around your world, have various effects and filters applied, zoomed in and out and other such visual modifications that you may need in your game.
 *
 * A camera can be scrolled about the game world by modifying its `scroll` value. This moves where the camera is relative to the game world, but will keep it in the same place relative to the canvas.
 *
 * @class Camera
 * @memberof Whirl
 * @extends Whirl.Base
 */
class Camera extends Base {
	constructor(game, options = {}) {
		super(game);
	}
}

module.exports = Camera;
