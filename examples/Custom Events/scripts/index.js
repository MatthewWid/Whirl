document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = new ms.game();

// game.assetManager.event.on("willLoadAsset", (data) => {
// 	console.log(data);
// });

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
	// Listen to the event for when the asset successfully loads
	asset.event.on("didLoad", (data) => {
		console.log(data);
	});
});

// Create a game container and give it the event system
let mycont = new MobSin.container(game, "eventTest");
game.object.init(mycont, "", ["eventSystem"]);

// Listen to 'mySpecialEvent' once
mycont.event.onOnce("mySpecialEvent", () => {
	console.log("ONE-TIME EVENT");
});
// Listen to 'myRepeatingEvent' all the time
mycont.event.on("myRepeatingEvent", () => {
	console.log("REPEATING EVENT");
});

// Emit the events
// Notice that 'mySpecialEvent' only logs once when called twice
// but 'myRepeatingEvent' logs twice when called twice
mycont.event.emit("mySpecialEvent");
mycont.event.emit("myRepeatingEvent");
mycont.event.emit("mySpecialEvent");
mycont.event.emit("myRepeatingEvent");

// When the game starts store the time it started
game.event.on("willStart", () => {
	startTime = Date.now();
	console.log("Game started");
});

// When the game ends calculate the time between it starting and finishing
game.event.on("willStop", () => {
	let expectStop = ((60 * 5 / 60) * 1000);
	let now = Date.now();
	console.log(`Stopped after: ${now - startTime}ms\nExpected stop: ${expectStop}ms\nDifference: ${(now - startTime) - expectStop}ms`);
});

// On each update check if 180 frames have passed (Approx. three seconds)
// If so, stop the game
game.event.on("willUpdate", (data) => {
	if (data.frameCount >= 60 * 5) {
		game.stop();
	}
});

game.start();