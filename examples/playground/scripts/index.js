document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let ms = MobSin;

let game = new ms.game();

let myVp = game.viewportManager.add("vp", "#canvas", ms.STAGE, ms.CAMERA, {
	cW: 400,
	cH: 400
});

console.log(game.v.get("vp"));