# Game Classes

All top-level classes are namespaced under the global `MobSin` object. Therefore, any top-level class documented here is implied to be a property of the `MobSin` object unless specifically under a sub-header of another class.

All classes are initialised as you call them. You should not use the `new` keyword.

# MobSin

The global `MobSin` object contains all the classes, constructors and constants that make up the **MobSin** game engine.

```javascript
MobSin
```

## Properties

### Constructors

`.Game()`

<span class="tI">
	Returns a new [Game](#game) instance object.
</span>

`.Sprite()`

<span class="tI">
	Returns a new [Sprite](#sprite) instance object.
</span>

`.Camera()`

<span class="tI">
	Returns a new Camera instance object.
</span>

`.Text()`

<span class="tI">
	Returns a new advanced Text instance object.
</span>

`.shapes`

<span class="tI">
	An object containing constructors for shapes for use in bounding boxes.
</span>

### Functions

`.util`

<span class="tI">
	An object containing various utility functions to assist in certain task.
</span>

`.math`

<span class="tI">
	An object containing various mathematical functions and calculations.
</span>

`.easing`

<span class="tI">
	An object containing functions for mathematical easing numerical values.
</span>

### Constants

`.STAGE`

<span class="tI">
	Used in Viewport instantiation to indicate the engine to automatically create a new Stage.
</span>

`.CAMERA`

<span class="tI">
	Used in Viewport instantiation to indicate to the engine to automatically create a new Camera.
</span>

# .Game()

Returns a new instance of a Game object.

The `Game` object is the actual running and workforce of the engine that updates your game, handles various object managers and deals with all interactions and rendering.

```javascript
MobSin.Game(<options>)
```

## Parameters

**Object** `<options>`

<span class="tI">
	Preset configuration options for the Game instance.  
	**Boolean** `ignoreWarnings` - Ignore debug warnings (Default: `true`).  
	**Boolean** `noInput` - Do not setup input event listeners on game startup (Default: `false`).  
	**String** `inputElement` - Element that listens for keyboard inputs (Default: `document.body`).
</span>

## Properties

`.config`

<span class="tI">
	**Object**  
	Persistent configuration of the Game instance.
</span>
<span class="tI">
	<span class="tI">
		`ignoreWarnings` - Ignore debug warnings. Also set through the initialisation paramaters.
	</span>
</span>

`.frameRate`

<span class="tI">
	**Integer**  
	Limits the maximum frames per second (FPS).
</span>

`.frameCount`

<span class="tI">
	**Integer**  
	The number of frames elapsed since the game's beginning.
</span>

## Methods

`.setup(<options>)`

<span class="tI">
	Returns the Game object.
</span>

<span class="tI">
	**Object** `<options>`
</span>

<span class="tI">
	<span class="tI">
		**String** `canvas` - Selector for an HTML5 `<canvas>` element.
	</span>
	<span class="tI">
		**String** `canvasWidth` or `cW` - Width in pixels to resize the canvas element to.
	</span>
	<span class="tI">
		**String** `canvasHeight` or `cH` - Height in pixels to resize the canvas element to.
	</span>
	&nbsp;
	<span class="tI">
		If a canvas width or height value is not given then the canvas will not resize but still be locked at its dimensions.
	</span>
</span>

<span class="tI">
	Automatically sets up the game with a Viewport, Stage and Camera.
</span>

<span class="tI">
	This is not required to set up a game. Alterantively, a Viewport, Stage and Camera can be set up manually using the Viewport manager.
</span>

<span class="tI">
	Once the game finished setting up, emits the `didSetup` event on the Game object.
</span>

<span class="tI">
	**Example:**
</span>

```javascript
const myGame = MobSin.Game()
    .setup({
    	canvas: "#myCanvas",
		canvasWidth: 400,
		canvasHeight: 400
    })
    .start();
```

`.start()`

<span class="tI">
	Returns the Game object.
</span>

1. Sets the `Game.running` flag to `true`.
2. Emits the `willStart` event.
3. Starts the update and render loop.

<span class="tI">
	By default the game does not start on creation, and must be started with this method.  
	Will not execute if the game is already running.
</span>

<span class="tI">
	**Example:**
</span>

```javascript
const myGame = MobSin.Game()
	.start();
```


`.stop()`

<span class="tI">
	Returns the Game object.
</span>

1. Sets the `Game.running` flag to `false`.
2. Emits the `willStop` event.

<span class="tI">
	This is a *request* to stop the game loop. It will not execute immediately, but at the beginning of the next available check. Therefore, an extra update tick may run even after calling `.stop()`.
</span>

<span class="tI">
	**Example:**
</span>

```javascript
const myGame = MobSin.Game()
	.start();

myGame.stop();
```

# .Sprite()

Returns a new instance of a `Sprite.Rectangle()` object unless specified otherwise.

Sprites are visible "*things*" in your game world. They have a position, bounding boxes, a fill colour or image and a plethora of other properties that can be modified.

All Sprites inherit from a `MobSin.Sprite._baseSprite` class, and different types of Sprites extend the functionality of the base Sprite.

Inherits the `tween` object system.

```javascript
MobSin.Sprite(<game>, <name>, <fill>, <options>)
```

## Parameters

**Object** `<game>`

<span class="tI">
	An already instantiated [Game](#game) object.
</span>

<span class="tI">
	All sprites must be instantiated into an existing game instance so that they can be handled by the global object manager.
</span>

**String** `<name>`

<span class="tI">
	A custom name for the Sprite.
</span>

<span class="tI">
	This name is used for identification as well as better indexing capabilities and searching the global object store.
</span>

**String** or **Object** or **NULL** `<fill>`

<span class="tI">
	A colour or image to fill the Sprite with.  
	Performs the same function as the `Sprite.setFill()` method.
</span>

<span class="tI">
	Providing a **string** will attempt to resolve the fill to a *colour*.  
	**Do not** give colour values with transparency. Instead use the `.alpha` property.  
	**Example:** `rgb(0, 255, 220)` or `#F00` or `cyan` etc.
</span>

<span class="tI">
	If an **object** is given, it must be a `MobSin.Asset` image object.  
	Most Sprite types will attempt to scale the image to their `bounds`.
</span>

<span class="tI">
	If `null` or any other non-valid fill value is given then the Sprite will be given a transparent colour fill by default.
</span>

**Object** `<options>`

<span class="tI">
	**String** `outline` - String colour value for a one-pixel thick outline of the Sprite (Default: `false`).  
	**Float** `alpha` - Alpha/transparency for the Sprite (0 to 1) (Default: `1`).  
	**Float** `scale` - The scale of this Sprite - scales its bounding box size. (Default: `1`).  
	**Integer** `z` - z-index (Layer) of this Sprite (Default: `0`).
</span>

## Properties

`.fill`

<span class="tI">
	**String** or **Object** or **NULL**  
	See the [Sprite <fill\> parameter](#parameters_1).
</span>

`.outline`

<span class="tI">
	**String**  
	If a value is given, a one-pixel thick line of the given colour value will be drawn around the sprite.  
	Not affected by the `.alpha` property.  
	Typically used for debugging.
</span>

`.alpha`

<span class="tI">
	**Float**  
	Adjusts the alpha/transparency for the Sprite.  
	Must only be between `0` and `1`.  
	An alpha of `1` means the sprite is visible as normal. An alpha of `0` means the sprite is completely invisible.
</span>

`.scale`

<span class="tI">
	**Float**  
	Scales the Sprite's `bounds` by the given value.  
	By default all Sprites scale from their top-left origin point, however this can be changed if the Sprite offers an `anchor` property.
</span>

`.z`

<span class="tI">
	**Integer**  
	The z-axis value for this Sprite. Allows for 'layering' of Sprites over one-another.  
	A Sprite with a `z` value higher than another's will appear ontop of the other.  
	Sprites with the same `z` value will be ordered by their order in the object store.
</span>

## Methods

`.setFill(<fill>)`

<span class="tI">
	See the [Sprite <fill\> parameter](#parameters_1).
</span>

<span class="tI">
	**Example:**
</span>

```javascript
mySprite.setFill("rgb(100, 255, 255)");
```