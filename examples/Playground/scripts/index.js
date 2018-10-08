let {log} = console;

function update(data) {
	// Run some code on each update ...
	let {game} = data;
}

let block, block2, circle, group;

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
		z: 1,
		outline: "#111"
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

	// Move our red block 200 pixels to the left over 1 second
	block.tween({}, {x: 200}, 1000, {modify: "bounds", easing: MobSin.easing.cubic.inOut});

	// Grow our circle bigger and smaller over two seconds
	circle.tween({scale: 1.5}, {scale: 2}, 1000, {easing: MobSin.easing.quadratic.out})
	.chain(
		circle.tween({scale: 2}, {scale: 1.5}, 1000, {easing: MobSin.easing.quadratic.inOut})
	);

	// game.tweenManager.purge = false;

	group = game.tweenManager.createGroup([
		block2.tween({scale: 1}, {scale: 2}, 1000),
		block2.tween({scale: 2}, {scale: 1}, 1000)
	], {loop: true});
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