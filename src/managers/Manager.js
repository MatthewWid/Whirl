/**
 * @classdesc
 * Abstract manager class used internally to instantiate and identify all game manager subtypes.
 *
 * @ignore
 * @abstract
 * @class Manager
 * @memberof Whirl.Game
 * @see Whirl.Game
 */
class Manager {
	_game;

	constructor(game) {
		this._game = game;
	}
}

module.exports = Manager;
