function update(data) {
	// Run some code each update loop ...
}

function setup(data) {
	let {game, viewport, stage, camera} = data;

	// Set up your game
	// Create objects, initialise stage, viewport and camera, insert plugins, etc.
	stage.child.add([
		MobSin.Sprite(game, "block1", "#0F0", {
			x: 50,
			y: 50,
			w: 50,
			h: 50,
			z: 4
		}),
		MobSin.Sprite(game, "block2", "#F00", {
			x: 75,
			y: 75,
			w: 50,
			h: 50,
			z: 6
		})
	]);

	const i = 3;
	// Listen for clicks on the viewport
	viewport.event.on("mouseClick", (evt) => {
		// When clicked create a new Sprite at the mouse position
		const newSprite = MobSin.Sprite(
			game,
			`block${i}`,
			MobSin.util.randRGB(),
			{
				x: evt.pos.x,
				y: evt.pos.y
			}
		);
		// Make that Sprite fade in and grow bigger over the next .4 seconds
		newSprite.tween({
			x: evt.pos.x,
			y: evt.pos.y,
			w: 0,
			h: 0,
			alpha: 0
		}, {
			x: evt.pos.x - 25,
			y: evt.pos.y - 25,
			w: 50,
			h: 50,
			alpha: 1
		}, 400, {
			modify: "bounds",
			easing: MobSin.easing.quadratic.out
		});

		// Add the Sprite to the game world
		stage.child.add(newSprite);
	});
}

const game = MobSin.Game()
	.setup({
		setup,
		update,

		canvas: "#canvas",
		cW: 600,
		cH: 400
	})
	.start();
