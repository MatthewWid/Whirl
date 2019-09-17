class Base {
	_id;
	_data = {};

	constructor(game) {
		if (game instanceof Whirl) {
			console.log("Adding to game instance...");
		} else {
			throw "Whirl | Game objects must be instantiated into a valid instance of a Whirl game.";
		}
	}
}

module.exports = Base;
