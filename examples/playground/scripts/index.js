document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = new ms.game();

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400,
	bg: "rgb(255, 0, 0)"
});

game.start();

// setTimeout(game.stop, 5000);