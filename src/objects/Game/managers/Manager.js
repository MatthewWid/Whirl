/**
 * @classdesc
 * Abstract manager class used internally to instantiate and identify all game manager subtypes.
 *
 * @ignore
 * @abstract
 * @class Manager
 * @memberof Whirl.Game
 *
 * @see Whirl.Game
 */
class Manager {
	/**
	 * The game instance this object belongs to.
	 *
	 * @memberof Whirl.Manager#
	 * @type {Whirl.Game}
	 * @readonly
	 */
	game;

	constructor(game) {
		this.game = game;
	}
}

export default Manager;
