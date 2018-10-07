let {log} = console;

function update(data) {
	// Run some code on each update ...
	let {game} = data;
}

let block, block2, circle;

function setup(data) {
	let {game, stage, camera} = data;

	// Create a red block
	block = MobSin.Sprite(game, "block", "#E00", {
		x: 50,
		y: 50,
		w: 50,
		h: 50,
		z: 0
	});

	// Create a green block
	block2 = MobSin.Sprite(game, "under_block", "#0E0", {
		x: 75,
		y: 75,
		w: 50,
		h: 50,
		z: 1
	});

	circle = MobSin.Sprite(game, "circle", "#0EE", {
		shape: MobSin.shapes.Circle(),
		x: stage.limits.getMidpoint().x,
		y: stage.limits.getMidpoint().y,
		r: 50,
		scale: 1.5
	});

	// Add it to our game world
	stage.child.add([
		block,
		block2,
		circle
	]);
}

// let MobSinShorten = require("./plugins/MobSinShorten.js");
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

let game = MobSin.Game()
	.event.onOnce("didSetup", setup)
	.event.on("willUpdate", update)
	.pluginManager.connect([MobSinShorten])
	.setup({
		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();