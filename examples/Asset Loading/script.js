function setup({game, viewport, stage, camera}) {
	// We want to use pixel art, so let's turn off anti-aliasing
	viewport.imageSmoothing = false;

	// Load an array of asset files
	game.assetManager.load([
		// Load an image file "playerSprite.png"
		// called "player" from the "./img/" directory
		{
			name: "player",
			type: "image",
			src: "../_common/img/playerSprite.png"
		},
		// Load an audio file "8bit.mp3"
		// called "bg_music" from the "./audio/" directory
		{
			name: "bg_music",
			type: "audio",
			src: "../_common/audio/8bit.mp3"
		}
	])
	.event.on("didLoadAsset", ({asset, timeTaken}) => {
		// If the loaded asset is our playerSprite.png image then
		// create a Sprite and fill it with the image
		// then add the Sprite to the world
		if (asset.name === "player") {
			const player = Whirl.Sprite(game, "player", asset, {
				x: 100,
				y: 100,
				scale: 2
			})
				.anchor.center();

			stage.child.add(player);
		}
	})
	.event.onOnce("didLoadAll", ({newAssets, timeTaken}) => {
		console.log(newAssets);
	});
}

Whirl.Game()
	.setup({
		setup,
		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();
