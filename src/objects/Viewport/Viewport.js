const Base = require("../Base/");
const {Rectangle, Point} = require("../../shapes/");

class Viewport extends Base {
	_canvas;
	_ctx;
	bounds;
	scroll;
	clip;
	imageSmoothing;
	zoom;
	lerp;

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

		this.clip = options.hasOwnProperty("clip") ? options.clip : true;

		this.imageSmoothing = options.hasOwnProperty("imageSmoothing") ? options.imageSmoothing : true;

		this.zoom = options.hasOwnProperty("zoom") ? options.zoom : 1;

		this.lerp = options.hasOwnProperty("lerp") ? options.lerp : 1;

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

	scrollTo(px, py) {
		let x = px;
		let y = py;

		// (Point)
		if (px instanceof Point._class) {
			x = px.x;
			y = px.y;
		}

		this.scroll.x = x;
		this.scroll.y = y;
	}
}

module.exports = (...args) => new Viewport(...args);
module.exports._class = Viewport;
