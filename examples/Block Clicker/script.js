function update(data) {
	// Run some code each update loop ...
}

function setup(data) {
	let {game, viewport, stage, camera} = data;

	// Set up your game
	// Create objects, initialise stage, viewport and camera, insert plugins, etc.

	// Counter to ensure unique names
	const i = 1;
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
			// from
			x: evt.pos.x,
			y: evt.pos.y,
			w: 0,
			h: 0,
			alpha: 0
		}, {
			// to
			x: evt.pos.x - 25,
			y: evt.pos.y - 25,
			w: 50,
			h: 50,
			alpha: 1
		},
		// ms
		400, {
			// modify the "bounds" object of the sprite
			// set the easing function of the tween to out-quadratic
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
