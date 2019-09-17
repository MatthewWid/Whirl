const Base = require("../Base/");
const {Rectangle, Point} = require("../../shapes/");

class Viewport extends Base {
	_canvas;
	_ctx;
	bounds;
	scroll;

	constructor(game, options = {}) {
		super(game);

		if (options.bounds instanceof Rectangle._class) {
			this.bounds = options.bounds;
		} else {
			this.bounds = Rectangle(
				options.x || 0,
				options.y || 0,
				options.w || 0,
				options.h || 0,
			);
		}

		if (options.scroll instanceof Point._class) {
			this.scroll = options.scroll;
		} else {
			this.scroll = Point(
				options.scrollX || 0,
				options.scrollY || 0,
			);
		}

		this.setCanvas(options.canvas, options.resize);
	}

	setCanvas(selector = this._game.config.get("canvas"), resize = false) {
		const canvas = document.querySelector(selector);

		if (!canvas) {
			throw new Error("Whirl | Viewport cannot find the given canvas element to render to.");
		}

		if (resize) {
			canvas.width = this.bounds.w;
			canvas.height = this.bounds.h;
		}

		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");

		return this;
	}
}

module.exports = (...args) => new Viewport(...args);
module.exports._class = Viewport;
