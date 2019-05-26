/*
	Attempt to prevent the default behaviour of a native event if the game
	configuration specifies to prevent it.
*/

module.exports = (_game, evt) => {
	if (_game.config.input.preventDefault) {
		evt.preventDefault();
	}
};
