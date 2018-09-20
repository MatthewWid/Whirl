// Alias some things away so we don't have to type them every time
// document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";
let ms = MobSin;
let game = new ms.Game();

let vp = game.viewportManager.add("myScreen", "#canvas", ms.STAGE, ms.CAMERA, {
	cW: 400,
	cH: 400
});

vp.activeStage.child.add([
	new ms.Sprite(game, "border", "transparent", {
		w: 400,
		h: 400,
		outline: "green"
	}),
	new ms.Sprite(game, "player", "red", {
		w: 50,
		h: 50
	})
]);

game.event.on("willUpdate", () => {
	game.object.get("myScreen")[0].activeCamera.scroll.x += .5;
	game.object.get("myScreen")[0].activeCamera.scroll.y -= 1;
	game.object.get("myScreen")[0].activeStage.child.getAll()[1].bounds.x += 1;
});
game.event.on("didUpdate", () => {
	if (game.object.get("myScreen")[0].activeStage.child.getAll()[1]._physBounds.x > 200) {
		game.stop();
	}
});

game.start();