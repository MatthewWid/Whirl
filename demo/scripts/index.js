let game = new MobSin();

game.viewport.add("mainCanvas", "#canvas", game.stage.add("world"), {
	width: 480,
	height: 280,
	bg: "rgb(0, 0, 150)"
});

game.start();