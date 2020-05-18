/**
 * Library of abstract rendering sytems that wrap the rendering logic of an actual system or third-party library into a standardised set of standard methods used by the engine to render things onto the screen.
 *
 * @namespace render
 * @memberof Whirl
 */
module.exports = {
	Renderer: require("./Renderer.js"),
	CanvasRenderer: require("./CanvasRenderer"),
	WebglRenderer: require("./WebglRenderer"),
};
