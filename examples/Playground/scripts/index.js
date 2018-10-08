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
	}).anchor.center();

	// Create a green block
	block2 = MobSin.Sprite(game, "under_block", "#0E0", {
		x: 75,
		y: 75,
		w: 50,
		h: 50,
		z: 1
	});

	circle = MobSin.Sprite(game, "ball", "#0EE", {
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

	block.tween({}, {x: 200}, 5000, {modify: "bounds"});
}

let game = MobSin.Game()
	.event.onOnce("didSetup", setup)
	.event.on("willUpdate", update)
	.setup({
		canvas: "#canvas",
		canvasWidth: 400,
		canvasHeight: 400
	})
	.start();

game.input.event.on("keyDown", (data) => {
	console.log(data.keyName);
});