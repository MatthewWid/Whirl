function update(data) {
	// Run some code each update loop ...
}

function setup(data) {
	let {game, viewport, stage, camera} = data;

	// Set up your game
	// Create objects, initialise stage, viewport and camera, insert plugins, etc.
}

// Create a new game
// Call the 'setup' function when the "didSetup" event fires
// Set up the game with the given canvas and make it 400x400 pixels
// Call the 'update' function when the "willUpdate" event fires
// Start the game loop
MobSin.Game()
	.event.onOnce("didSetup", setup)
	.setup({
		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.event.on("willUpdate", update)
	.start();