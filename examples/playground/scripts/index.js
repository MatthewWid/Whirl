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

// Create a new container called "dad"
let myCont = new ms.container(game, "dad").child.add([
	// A new container "son" is the child of the container "dad"
	new ms.container(game, "son").child.add(
		new ms.container(game, "dad's grandson")
	),

	// A new container "daughter" is the child of the container "dad"
	new ms.container(game, "daughter")
]).child.getAllDeep().forEach((e) => { // Deep-lookup every child of the container "dad" and run through each returned object
	console.log(e._type + " | " + e.name); // Log out the names of the returned children
});

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 400,
	cH: 400
});