class Base {
	_game;
	_id;
	_type = "Whirl.Base";
	_data = {};

	constructor(game) {
		if (!(game instanceof Whirl)) {
			throw new Error("Whirl | Game objects must be instantiated into a valid instance of a Whirl game.");
		}

		game.object.add(this);
	}
}

module.exports = Base;
