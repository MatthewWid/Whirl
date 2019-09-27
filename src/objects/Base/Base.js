class Base {
	_game;
	_id;
	active = true;
	data = {};

	constructor(game) {
		if (!(game instanceof Whirl.Game._class)) {
			throw new Error("Whirl | Game objects must be instantiated into an instance of a Game.");
		}

		this._game = game;

		game.object.add(this);
	}

	_update() {}

	_render() {}
}

module.exports = Base;
