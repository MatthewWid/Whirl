# Getting Started

This article will be an introduction to the MobSin game engine showcasing certain features and building a small interactive application.

After completing this walkthrough you are encouraged to read [the full documentation](../documentation/classes) to get an in-depth understanding of what each feature of the engine does, what it is and how to use it.

## Installation and Setup

The first thing we need is the engine itself. Follow the four simple steps in the [installation guide](../documentation/install) to build the JavaScript file from the source code, then open `examples/Simple Setup/index.html` file in your browser and the `script.js` in a text editor of your choice.

If you have done everything correctly you should see an empty black screen with a white box - that is the canvas we will be drawing to.

## The Starter File

We will mainly be working in the `script.js` file located in the `/Simple Setup/` example project directory. Let's take a look a look at what is set up for us beforehand.

Here is the code we are given:

```javascript
function update(data) {

}

function setup(data) {
	const {game, viewport, stage, camera} = data;
}

MobSin.Game()
	.setup({
		setup,
		update

		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();
```

Let's go through each line one by one.

```javascript
function update(data) {
```

This is our own function that we give to MobSin - it will be called once every update loop. You can use this function to update, modify and check objects within your game world or have anything you could want to run once every frame here.

```javascript
function setup(data) {
	const {game, viewport, stage, camera} = data;
}
```

This is our own function that we give to MobSin - it will be called after the engine has finished setting up things like game state, the game canvas, viewports, game worlds, etc.

You can use this function to perform all the setup your game will need such as creating objects, inserting sprites, positioning cameras, loading assets and more. We will get into doing some of these later on.

Our function receives a single paramater `data` that gives us access to new objects created by the game setup. We will go into what a "viewport", "stage" and "camera" is later. For now know that `game` is a reference to the game instance are creating.

```javascript
MobSin.Game()
```

To create a game we must create a new instance of the game class that MobSin provides us. When `MobSin.Game()` is called it will internally set up  everything the game needs to run such as mouse and keyboard input, custom plugins and other various useful functions and processes.

You can also configure certain aspects of the game instance by passing [configuration variables](../documentation/classes/#parameters) as a JavaScript object to this function, but we'll just keep everything default for now.

```javascript
.setup({
	setup,
	update

	canvas: "#canvas",
	cW: 400,
	cH: 400
})
```

We could set up everything we want for the game ourself; the canvas, viewport, game world, event hooks, etc. but this requires a bit of code and we want to get started as quickly as possible. Thankfully for us MobSin provides [a handy setup function](../documentation/classes/#methods) that will automatically do this all for us.

We pass our `setup` and `update` functions (using the new ES6 object property shorthand) as properties `setup` and `update` respectively to indicate that when the game starts we want it call our setup function and each time the game loop completes we want it to call our update function.

`canvas: "#canvas"` tells MobSin to use the targeted canvas element to render to (Check the `index.html` file in the `/Simple Setup/` directory!).  
`cW: 400` and `cH: 400` will size our canvas to be 400x400 pixels.

```javascript
.start();
```

After all that we call our [`start()` method](../documentation/classes/#methods) to begin running the game.

Let's recap what the code given to us has done:

* Created a new MobSin game instance.
* Told the game to call our `setup` function when the game is finished setting up and our `update` function after each update loop.
* Provides a canvas element for the game to render to.
* Starts the game loop.

Our game is now being rendered to the canvas, but it remains empty because there is nothing to render yet.

## Creating our First Sprite
