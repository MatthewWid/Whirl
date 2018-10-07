// MobSinShorten

let MobSinShorten = {
	connected: (_game) => {
		_game.a = _game.assetManager;
		_game.i = _game.input;
		_game.o = _game.object;
		_game.s = _game.stageManager;
		_game.t = _game.tweenManager;
		_game.v = _game.viewportManager;

		_game.event.on("didInitObject", (data) => {
			if (data.useSystems.event) {
				data.object.e = data.object.event;
			}
			if (data.useSystems.tween) {
				data.object.t = data.object.tween;
			}
		});
	}
};

module.exports = MobSinShorten;