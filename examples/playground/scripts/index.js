// document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let ms = MobSin;

let game = new ms.game();

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400
});

game.start();