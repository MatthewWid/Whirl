let {log} = console;

function update(data) {
	// Run some code on each update ...
}

let block, block2;

function setup(data) {
	let {game, stage, camera} = data;

	game.tweenManager.purge = true;

	// Create a red block
	block = MobSin.Sprite(game, "block", "#E00", {
		x: 50,
		y: 50,
		w: 50,
		h: 50,
		z: 0
	});

	block.tween({x: 50}, {x: 300}, 2000, {modify: "bounds"})
		.event.onOnce("didFinish", () => {
			log("Tween finished");
		});

	// Create a green block
	block2 = MobSin.Sprite(game, "under_block", "#0E0", {
		x: 75,
		y: 75,
		w: 50,
		h: 50,
		z: 1
	});

	// Add it to our game world
	stage.child.add([
		block,
		block2
	]);
}

// Create a new game
// Call the 'setup' function when the "didSetup" event fires
// Set up the game with the given canvas and make it 400x400 pixels
// Call the 'update' function when the "willUpdate" event fires
// Start the game loop
let game = MobSin.Game()
	.event.onOnce("didSetup", setup)
	.setup({
		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.event.on("willUpdate", update)
	.start();