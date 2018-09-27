'use strict'

let {log} = console;

function update(data) {
	// console.log(data.game.stageManager.get("main_stage").children);

	if (data.frameCount >= 600) {
		data.game.stop();
		log("Game stopped");
	}
}

let block, block2;

function setup(data) {
	let {game, stage} = data;

	// Create a red block
	block = new MobSin.Sprite(game, "block", "#E00", {
		x: 50,
		y: 50,
		w: 50,
		h: 50,
		z: 0
	});
	// Create a green block
	block2 = new MobSin.Sprite(game, "under_block", "#0E0", {
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