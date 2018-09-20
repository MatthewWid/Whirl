// Alias some things away so we don't have to type them every time
// document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";
let ms = MobSin;
let game = new ms.game();

// Create our variables
let player, player2, bouncyBlock, worldBorder, myStage, myViewport, myCamera;
let speed = 3;

// Called when our game has finished its initial load
function setup() {
	// Create our player sprite
	player = new ms.Sprite(
		game, // In our game
		"player", // With the name "player"
		game.assetManager.get("playerPic"), // Fill with our player image
		{
			x: 50,
			anchor: {
				x: .5,
				y: .5
			}
		}
	);

	player2 = new ms.Sprite(
		game, // In our game
		"player", // With the name "player"
		game.assetManager.get("playerPic"), // Fill with our player image
		{
			x: 120, // Sprite coordinates
			y: 150 // Width and height are automatically set to our images width and height
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

	// Create a sprite for showing our world border
	worldBorder = new ms.Sprite(
		game,
		"worldBorder",
		"transparent", // Do not fill it
		{
			outline: "#CCC", // Give it a gray
			// Give it the same dimensions as the edges of world
			x: myStage.limits.x,
			y: myStage.limits.y,
			w: myStage.limits.w,
			h: myStage.limits.h
		}
	);
	myStage.child.add(worldBorder); // Add it to our world

	// Create a camera to look into our game world
	myCamera = new ms.Camera(game, {
		zoom: 1,
		scroll: { // Scroll the camera in the game world
			x: 0,
			y: 0
		},
		anchor: { // Set the camera anchor to the center of the screen
			x: .5,
			y: .5
		},
		lockTo: player
	});

	// Create our viewport (the screen for our game)
	// and tell it to render our world (myStage) using our camera (myCamera)
	myViewport = game.viewportManager.add("vp", "#canvas", myStage, myCamera, {
		cW: 400, // Resize the canvas to 400x400
		cH: 400
	});

	// // Create a Heads-Up-Display screen and put a crosshair on it
	// game.viewportManager.add("hud", "#canvas", ms.STAGE, ms.CAMERA, {
	// 	clear: false
	// });
	// game.viewportManager.get("hud").activeStage.child.add([
	// 	new ms.Sprite(game, "crosshair", "#F00", {x: 199, y: 192, w: 2, h: 16}),
	// 	new ms.Sprite(game, "crosshair", "#F00", {x: 192, y: 199, w: 16, h: 2})
	// ]);

	// Call our update function when the game updates
	game.event.on("willUpdate", preUpdate);
	game.event.on("didUpdate", postUpdate);

	// Ready? Start the game!
	game.start();
}

let interp = .1;

// Move things before updating
function preUpdate() {
	bouncyBlock.bounds.x += speed; // Move our bouncyBlock each game time
}

// Check things after updating
function postUpdate() {
	// Reverse direction and change colour when it hits the edge of the world
	if (bouncyBlock._physBounds.x + bouncyBlock._physBounds.w > myStage.limits.w) {
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