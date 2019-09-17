class Base {
	_game;
	_id;
	active = true;
	data = {};

	constructor(game) {
		if (!(game instanceof Whirl.Game._class)) {
			throw new Error("Whirl | Game objects must be instantiated into a valid instance of a Whirl game.");
		}

		this._game = game;

		game.object.add(this);
	}
}

module.exports = Base;
