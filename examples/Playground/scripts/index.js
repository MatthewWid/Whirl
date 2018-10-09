let {log} = console;

function update(data) {
	// Run some code on each update ...
	let {game} = data;
}

let block, circle;

function setup(data) {
	let {game, stage, viewport, camera} = data;
	viewport.imageSmoothing = false;
	block = MobSin.Sprite.Rectangle(game, "bobby", "#E00", {
		x: 50,
		y: 50,
		z: 0,
		scale: 3,
		outline: "#55F"
	});

	circle = MobSin.Sprite.Circle(game, "roundy", "#55F", {
		x: 250,
		y: 200,
		r: 20
	});

	stage.child.add([
		block,
		circle
	]);

	game.tweenManager.createGroup([
		circle.tween({scale: 1}, {scale: 2}, 1000),
		circle.tween({scale: 2}, {scale: 1}, 1000)
	], {loop: true});

	// Assets are loaded asynchronously,
	// and Sprite fills are only set when the image finishes loading
	// even though the game has already started.
	game.assetManager.event.on("didLoadAsset", (data) => {
		if (data.asset.name === "playerImage") {
			block
				.setFill(data.asset)
				.resizeToImage();
		}
	});
}

let game = MobSin.Game() // Game instance
	.event.onOnce("didSetup", setup) // Set up game objects
	.event.on("willUpdate", update) // Update on each loop
	.assetManager.load([ // Pipe assets to be loaded
		{
			name: "playerImage",
			type: "image",
			src: "./img/playerSprite.png"
		}
	])
	.setup({ // Setup game canvas, viewport, stage and camera automatically
		canvas: "#canvas",
		canvasWidth: 400,
		canvasHeight: 400
	})
	.start(); // Start the game loop