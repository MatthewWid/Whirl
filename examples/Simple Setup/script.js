function update({game, frameCount}) {
	// Run some code each update loop ...
}

function setup({game, viewport, stage, camera}) {
	// Set up your game
	// Create objects, initialise stage, viewport and camera, insert plugins, etc.
}

// 1. Create a new game
// 2. Call the 'setup' function when the "didSetup" event fires
// 3. Call the 'update' function when the "willUpdate" event fires
// 4. Set up the game with the given canvas and make it 400x400 pixels
// 5. Start the game loop
Whirl.Game()
	.setup({
		setup,
		update,

		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();
