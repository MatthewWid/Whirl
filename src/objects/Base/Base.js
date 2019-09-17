class Base {
	_game;
	_id;
	_type = "Whirl.Base";
	data = {};

	constructor(game) {
		if (!(game instanceof Whirl.Game._class)) {
			throw new Error("Whirl | Game objects must be instantiated into a valid instance of a Whirl game.");
		}

		game.object.add(this);
	}
}

module.exports = Base;
