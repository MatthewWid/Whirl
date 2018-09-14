// Alias some things away so we don't have to type them every time
document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";
let ms = MobSin;
let game = new ms.game();

// Create our variables
let player, player2, bouncyBlock, myStage, myViewport, myCamera;
let speed = 3;

// Called when our game has finished its initial load
function setup() {
	// Create our player sprite
	player = new ms.Sprite(
		game, // In our game
		"player", // With the name "player"
		game.assetManager.get("playerPic"), // Fill with our player image
		{
			scale: 1
		}
	);

	player2 = new ms.Sprite(
		game, // In our game
		"player", // With the name "player"
		game.assetManager.get("playerPic"), // Fill with our player image
		{
			x: 110, // Sprite coordinates
			y: 160 // Width and height are automatically set to our images width and height
		}
	);

	// Create our bouncyBlock sprite
	bouncyBlock = new ms.Sprite(
		game, // In our game
		"bouncyBlock", // With the name "bouncyBlocker"
		ms.util.randRGB(), // Fill with a random colour
		{
			x: 50, // Sprite coordinates and dimensions
			y: 50,
			w: 50,
			h: 50
		}
	);

	// Create our stage (Game world)
	myStage = game.stageManager.add("world", {
		x: 0, // Stage coordinates and dimensions
		y: 0,
		w: 400,
		h: 400
	}).child.add([ // Add our sprites to the game world
		bouncyBlock,
		player,
		player2
	]);

	myCamera = new ms.Camera(game);

	// Create our viewport (Screen)
	myViewport = game.viewportManager.add("vp", "#canvas", myStage, myCamera, {
		cW: 400, // Resize the canvas to 400x400
		cH: 400
	});

	// Call our update function when the game updates
	game.event.on("willUpdate", preUpdate);
	game.event.on("didUpdate", postUpdate);

	// Ready? Start the game!
	game.start();
}

// Move things before updating
function preUpdate() {
	bouncyBlock.bounds.x += speed; // Move our bouncyBlock each game time
}

// Check things after updating
function postUpdate() {
	// Reverse direction and change colour when it hits the edge of the screen
	if (bouncyBlock._physBounds.x + bouncyBlock._physBounds.w > myViewport.bounds.w) {
		bouncyBlock.setFill(MobSin.util.randRGB());
		speed = -speed;
	}
	if (bouncyBlock._physBounds.x <= 0) {
		bouncyBlock.setFill(MobSin.util.randRGB());
		speed = -speed;
	}
}

// Load our assets
game.assetManager.load([
	{
		name: "playerPic",
		type: "image",
		src: "./img/playerSprite.png"
	}
// Begin game setup when assets have finished loading
]).event.onOnce("didLoadAll", setup);