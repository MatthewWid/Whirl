let game = new MobSin();

let startInd = game.assetM.add([
	{
		name: "zombie",
		type: "image",
		src: "./img/zombiehead.png"
	},
	{
		name: "player",
		type: "image",
		src: "./img/playerSprite.png"
	},
	{
		name: "giant_image",
		type: "image",
		src: "http://s1.1zoom.me/big3/189/Planets_solar_system_449630.jpg"
	}
]);

for (let i = startInd; i < game.assetM.getAll().length; i++) {
	console.log("Starting: " + game.assetM.getAll()[i]._id);
	game.assetM.getAll()[i].event.listener("didLoad", () => {
		console.log("Loaded: " + game.assetM.getAll()[i]._id);
	});
}

game.viewportM.add("mainC", "#canvas", game.stageM.add("world"), {
	cW: 500,
	cH: 400
});

game.start();