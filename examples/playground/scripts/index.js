document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let ms = MobSin;

let game = new ms.game();

let player = new ms.Sprite(game, "player", ms.util.randRGB(), {
	x: 50,
	y: 50,
	w: 50,
	h: 50,
	anchor: {
		x: .5,
		y: .5
	}
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

console.log(myStage, myViewport, player);