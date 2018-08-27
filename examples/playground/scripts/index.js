document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = new ms.game();

// Load two assets, and when loaded console log information about them
game.assetManager.add([
	{
		name: "player",
		type: "image",
		src: "./img/playerSprite.png"
	},
	{
		name: "bg_music",
		type: "audio",
		src: "./audio/8bit.mp3"
	}
]).forEach((asset) => {
	asset.event.on("didLoad", (data) => {
		console.log(`Loaded asset (${asset.type}): ${asset.name} (Took ${data.timeTaken}ms)`);
	});
});

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400
});