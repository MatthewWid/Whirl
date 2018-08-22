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

game.s.get("world").addChild(game.shape.circ("myCircle", 50, 50, 80));
game.stop();
game.s.get("world").getChildren()[0].render(game.vp.get("mainC").ctx);

game.start();