/**
 * Library of abstract rendering sytems that wrap the rendering logic of an actual system or third-party library into a standardised set of standard methods used by the engine to render things onto the screen.
 *
 * @namespace render
 * @memberof Whirl
 */
export {default as Renderer} from "./Renderer";
export {default as CanvasRenderer} from "./CanvasRenderer";
export {default as WebglRenderer} from "./WebglRenderer";
