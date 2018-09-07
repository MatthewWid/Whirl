document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let ms = MobSin;

let game = new ms.game();

let player = new ms.Sprite(game, "player", ms.util.randRGB(), {
	x: 50,
	y: 50,
	w: 50,
	h: 50
});

let myStage = game.stageManager.add("world", {
	x: 0,
	y: 0,
	w: 400,
	h: 400
}).child.add(
	player
);

let myViewport = game.viewportManager.add("vp", "#canvas", myStage, ms.CAMERA, {
	cW: 400,
	cH: 400
});

let moveRight = true;

// game.event.on("willUpdate", () => {
// 	if (moveRight) {
// 		player.bounds.x++;
// 	}
// 	if (moveRight) {
// 		player.bounds.x--;
// 	}

// 	if (player.bounds.x >= 300 || player.bounds.x <= 50) {
// 		moveRight = !moveRight;
// 	}
// });

game.event.on("didUpdate", (data) => {
	if (data.frameCount >= 60 && false) {
		game.stop();
		console.log("Stopped");
	}
});

console.log(myStage, myViewport, player);

game.start();