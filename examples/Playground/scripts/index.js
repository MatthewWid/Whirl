let {log} = console;

function update(data) {
	// console.log(data.game.stageManager.get("main_stage").children);

	if (data.frameCount >= 240) {
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

let block1 = game.object.getByName("block")[0];

// Change the block's alpha from 1 to 0.4 over 2 seconds
block1.tween({alpha: .4}, {alpha: 1}, 4000);

// Move the block to (300, 100) over 2 seconds and then move it to (100, 100) over 2 seconds
let tween2 = game.tweenManager.create(block1.bounds, {x: 50, y: 50}, {x: 300, y: 100}, 2000, {
	easing: MobSin.tweens.quadratic.out,
	roundValues: true
}).chain(
	game.tweenManager.create(block1.bounds, {x: 300}, {x: 100}, 2000, {
		start: false,
		roundValues: true
	})
);