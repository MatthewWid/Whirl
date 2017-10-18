This is a simple test game engine I made for JS Canvas - It currently just has simple animations, helper functions, transitions, camera manipulation, game objects and an object manager.

# Make a simple animation

Let's make a simple animation using the MobSin Game Engine.

Let's start with a simple HTML template (Omitting a few necessary tags) with some basic styling, a canvas that can be selected, and two script files - One for the game engine (`mobsin_engine.js`), and one for your own code (`script.js`).

```HTML
<style>
  #canvas {
    box-shadow: 0 0 0 1px #CCC;
    background-color: #FFF;
  }
</style>

<canvas id="canvas"></canvas>
<script src="mobsin_engine.js"></script>
<script src="script.js"></script>
```

Next, in your `script.js` file, let's get the engine set up.

Create an instance of the engine using `var game = new MobSin_Engine();`. We can then tell MobSin to render to the canvas we initially set up with `game.setStage()` that takes three arguments - the canvas selector, the width and the height of the canvas to be rendered on (Like this: `game.setStage("#canvas", 480, 320);`).

**Note**: You must call `setStage` immediately after instantiating the engine, before creating any objects or initiating game startup.

If you refresh the page now you should see that your canvas has been resized.

Let's now put a block into our game. Objects are added by instantiating an object from the pool of objects in `game.objects` and then instancing it into either the Workspace or the HUD.

We create an instance of a block like this: `var block = new game.objects.block();`. By default blocks have no dimensions until given values for coordinates and dimensions. We do this by providing an arguments to the `.block();` method in the form of an object that serves as a set of preset values for the block object. For example:

```javascript
var block = new game.objects.block({
	x: 50,
	y: 80,
	w: 90,
	h: 60
});
```

We are giving the block four preset values, an `x` and `y` coordinate, as well as a `w`idth and `h`eight dimension.

Congratulations you've created your first game object, but it doesn't actually exist in the game world yet. After initialising an object we must instance it into the game. We can simply do this by calling `block.instance("workspace");`. Notice how the `instance()` method takes a parameter of "workspace" - a block can be instanced into both the Workspace and the HUD.

*The Workspace is the actual game world that the player can explore, the HUD is constantly on the screen regardless of where the camera moves, and is not affected by game physics. The HUD should usually be used for player information like health or status bars.*

Your block is now in the game, but notice that when you refresh the page nothing appears. This is because we have not actually started the game loop. We can easily do this by calling `game.start();` which begins the update and rendering cycle. Here's what your `script.js` should look like:

```javascript
var game = new MobSin_Engine();
game.setStage("#canvas", 480, 320);

var block = new game.objects.block({
	x: 50,
	y: 80,
	w: 90,
	h: 60
});
block.instance("workspace");

game.start();
```

You should now see a black block on your screen, isn't that exciting! Let's change its colour. Objects that are instantiated into the game can be altered on the fly in MobSin. Open your console with `F12` and type `block.colour = "red";` and observe how your block changes to red instantaneously. You can even change the `x`, `y`, `w` and `h` coordinates/dimensions from the console, too, try it yourself!

Now we'll make the block move across the screen using the MobSin's linear transition function. We'll now get introduced to the `.anim` section of the engine, and use the `.transitionLinear` method which allows us to transition a certain property of an object over a given time period. Here's what that code will look like:

```javascript
game.anim.transitionLinear(block, "x", 3, block.x, block.x + 300);
```

It may look confusing at first, but it's quite simple once you know how the function works. `.transitionLinear()` takes five arguments, and an optional sixth argument which is a callback function that executes once the transition has finished. Here are what the individual arguments are for:

1. `block` - The object that the transition will be performed on.
2. `"x"` - The name of the property of that object that the transition will be performed on. In this case we're altering the `block.x` property, so we use `"x"`.
3. `3` - The time the transition takes it seconds.
4. `block.x` - The start position that the transition will begin from, in this place it will start at where we already are.
5. `block.x + 300` - The end position that the transition will end on. In this case it is the current position we are at *plus* three-hundred (300) pixels to the right.

Put this new code just after `block.instance("workspace");` and refresh your page. You'll now see your block slowly move across the screen over the course of three seconds.

![](https://i.gyazo.com/d3ce6c5a3a873a63f62cad90ea57c4b5.gif)

Pretty cool, but now let's have our block change colour once it reaches the end of its journey. Added a sixth parameter to your function that changes the block to a different colour. For example:

```javascript
game.anim.transitionLinear(block, "x", 3, block.x, block.x + 300, function() {
	block.colour = "#0F0";
});
```

Amazing! Let's have some text fly in to tell us how amazing that was. Inside your callback function, let's create a slight delay using the `.waitC` method from the MobSin engine, which takes an integer for seconds to wait, and then a function callback: `game.func.waitC(1, function() {`. Inside that we'll create our text object, which, along with `x`, `y` and `colour`, also takes extra parameters that are `text`, `size` and `font`.

Here's our code:

```javascript
game.func.waitC(1, function() {
	var text = new game.objects.textScreen({
		x: 140,
		y: 0,
		colour: "#F00",
		text: "Amazing!",
		size: 50,
		font: "Impact"
	});
	text.instance();
	game.anim.transitionLinear(text, "y", 1, -100, 50);
});
```

This is saying "Wait one second, then create a text object with text that says "Amazing!", and have it transition from the top into the screen".

Here is what it should look like finally:

![](https://i.gyazo.com/b84d01805725e8cd096eb2eb705033de.gif)

and here is what our final code looks like:

```javascript
var game = new MobSin_Engine();
game.setStage("#canvas", 480, 320);

var block = new game.objects.block({
	x: 50,
	y: 80,
	w: 90,
	h: 60
});
block.instance("workspace");

game.anim.transitionLinear(block, "x", 3, block.x, block.x + 300, function() {
	block.colour = "#0F0";

	game.func.waitC(1, function() {
		var text = new game.objects.textScreen({
			x: 140,
			y: 0,
			colour: "#F00",
			text: "Amazing!",
			size: 50,
			font: "Impact"
		});
		text.instance();
		game.anim.transitionLinear(text, "y", 1, -100, 50);
	});
});

game.start();
```

Hopefully this helped you to get started. Feel free to look through the `script.js` in this repo for a more advanced demonstration of the engine that features use of a lot of the helper functions and camera manipulation that have not been discussed here.

Hope you enjoy!
