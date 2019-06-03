function setup({game, viewport, stage, camera}) {
	// Counter to ensure unique names
	const i = 1;
	// Listen for clicks on the viewport
	viewport.event.on("mouseClick", ({pos}) => {
		// When clicked create a new Sprite at the mouse position
		const newSprite = Whirl.Sprite(
			game,
			`block${i}`,
			Whirl.util.randRGB(), // random fill colour
			{
				x: pos.x,
				y: pos.y
			}
		);
		// Make that Sprite fade in and grow bigger over the next .4 seconds
		newSprite.tween({
			// from
			x: pos.x,
			y: pos.y,
			w: 0,
			h: 0,
			alpha: 0
		}, {
			// to
			x: pos.x - 25,
			y: pos.y - 25,
			w: 50,
			h: 50,
			alpha: 1
		},
		// ms
		400,
		// options
		{
			// modify the "bounds" object of the sprite
			// set the easing function of the tween to out-quadratic
			modify: "bounds",
			easing: Whirl.easing.quadratic.out
		});

		// Add the Sprite to the game world
		stage.child.add(newSprite);
	});
}

Whirl.Game()
	.setup({
		setup,
		canvas: "#canvas",
		cW: 600,
		cH: 400
	});
