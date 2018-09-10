document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = new ms.game();

// Load an array of assets
game.assetManager.load([
	// Load an image called "player" from the "./img/" directory
	{
		name: "player",
		type: "image",
		src: "./img/playerSprite.png"
	},
	// Load an audio file called "bg_music" from the "./audio" directory
	{
		name: "bg_music",
		type: "audio",
		src: "./audio/8bit.mp3"
	}
])
.event.on("didLoadAsset", (data) => {
	console.log(data);
})
.event.onOnce("didLoadAll", (data) => {
	console.log(data);
});

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400
});

let player = new ms.Sprite(game, "player", game.assetManager.get("player"), {
	x: 50,
	y: 50,
	w: 50,
	h: 50,
	anchor: {
		x: .5,
		y: .5
	}
});