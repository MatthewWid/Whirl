let game = new MobSin.game();

game.assetManager.add([
	{
		name: "player",
		type: "image",
		src: "./img/playerSprite.png"
	}
]);

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400
});