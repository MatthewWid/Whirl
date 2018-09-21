function update() {
	// Run some code...
}

function setup(data) {
	let {game, stage} = data;

	// Create a red block
	let block = new MobSin.Sprite(game, "block", "#E00", {
		x: 50,
		y: 50,
		w: 50,
		h: 50
	});

	// Add it to our game world
	stage.child.add([
		block
	]);

	// The update function every time the game updates
	game.event.on("willUpdate", update);
}

// Create a new game
// Call the setup function when the "didSetup" event fires
// Set up the game with the given canvas and make it 400x400 pixels
// Start the game loop
MobSin.Game()
	.event.onOnce("didSetup", setup)
	.setup({
		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();