// Array of assets that we want loaded into our game
const assets = [
	// Load an image file "playerSprite.png" and call it "player_pic"
	{
		name: "player_pic",
		type: "image",
		src: "../_common/img/playerSprite.png"
	}
];

function setup({game, viewport, stage, camera}) {
	// We want to use pixel art, so let's turn off anti-aliasing
	viewport.imageSmoothing = false;

	/*
		Create a player Sprite using our 'playerSprite.png' image.
		Use `game.asset("player_pic")` to retrieve our image asset we loaded
		with the name "player_pic" above.
	*/
	const player = Whirl.Sprite(game, "player", game.asset("player_pic"), {
		x: 100,
		y: 100,
		scale: 2
	}).anchor.center();

	// Add the Sprite to the game world
	stage.child.add(player);
}

Whirl.Game()
	.setup({
		setup,
		assets,
		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();
