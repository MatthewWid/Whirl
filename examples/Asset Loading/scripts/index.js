document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = new ms.game();

// Load an array of assets
game.assetManager.add([
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
]).forEach((asset) => { // Loop through the newly added assets
	// Attach an event to every asset that fires when the asset finishes loading
	asset.event.on("didLoad", (data) => {
		// Log information about the newly loaded asset
		console.log(`Loaded asset (${asset.type}): ${asset.name} (Took ${data.timeTaken}ms)`);
	});
});

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400
});