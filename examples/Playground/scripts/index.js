let {log} = console;

function update(data) {
	// Run some code on each update ...
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
		z: 1,
		anchor: {
			x: .5,
			y: .5
		}
	});

	circle = MobSin.Sprite(game, "circle", "#0EE", {
		shape: MobSin.shapes.Circle(),
		x: stage.limits.getMidpoint().x,
		y: stage.limits.getMidpoint().y,
		r: 50,
		scale: 2
	});
	
	circle.tween({scale: 2}, {scale: 0}, 1000)
	.chain(
		circle.tween({scale: 0}, {scale: 2}, 1000)
	).chain(
		circle.tween({x: circle.bounds.x}, {x: circle.bounds.x + 200}, 2000, {modify: "bounds"})
	);

	block.tween({x: 50}, {x: 300}, 2000, {modify: "bounds"});

	// Add it to our game world
	stage.child.add([
		block,
		block2,
		circle
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