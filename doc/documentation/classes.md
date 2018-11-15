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

<span class="tI tI-1">
	Returns a new [Game](#game) instance object.
</span>

`.Sprite()`

<span class="tI tI-1">
	Returns a new [Sprite](#sprite) instance object.
</span>

`.Camera()`

<span class="tI tI-1">
	Returns a new Camera instance object.
</span>

`.Text()`

<span class="tI tI-1">
	Returns a new advanced Text instance object.
</span>

`.shapes`

<span class="tI tI-1">
	An object containing constructors for shapes for use in bounding boxes.
</span>

### Functions

`.util`

<span class="tI tI-1">
	An object containing various utility functions to assist in certain task.
</span>

`.math`

<span class="tI tI-1">
	An object containing various mathematical functions and calculations.
</span>

`.easing`

<span class="tI tI-1">
	An object containing functions for mathematical easing numerical values.
</span>

### Constants

`.STAGE`

<span class="tI tI-1">
	Used in Viewport instantiation to indicate the engine to automatically create a new Stage.
</span>

`.CAMERA`

<span class="tI tI-1">
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

<span class="tI tI-1">
	Preset configuration options for the Game instance.  
	**Boolean** `ignoreWarnings` - Ignore debug warnings (Default: `true`).  
	**Boolean** `noInput` - Do not setup input event listeners on game startup (Default: `false`).  
	**String** `inputElement` - Element that listens for keyboard inputs (Default: `document.body`).
</span>

## Properties

`.config`

<span class="tI tI-1">
	**Object**  
	Persistent configuration of the Game instance.
</span>
<span class="tI tI-1">
	<span class="tI tI-1">
		`.ignoreWarnings` - Ignore debug warnings. Also set through the initialisation paramaters.
	</span>
</span>

`.frameRate`

<span class="tI tI-1">
	**Integer**  
	Limits the maximum frames per second (FPS).
</span>

`.frameCount`

<span class="tI tI-1">
	**Integer**  
	The number of frames elapsed since the game's beginning.
</span>

## Methods

`.setup(<options>)`

<span class="tI tI-1">
	Returns the Game object.
</span>

<span class="tI tI-1">
	**Object** `<options>`
</span>

<span class="tI tI-1">
	<span class="tI tI-1">
		**String** `canvas` - Selector for an HTML5 `<canvas>` element.
	</span>
	<span class="tI tI-1">
		**String** `canvasWidth` or `cW` - Width in pixels to resize the canvas element to.
	</span>
	<span class="tI tI-1">
		**String** `canvasHeight` or `cH` - Height in pixels to resize the canvas element to.
	</span>
	<span class="tI tI-1">
		If a canvas width or height value is not given then the canvas will not resize.
	</span>
</span>

<span class="tI tI-1">
	AutomatI tI-1cally sets up the game with a Viewport, Stage and Camera.
</span>

<span class="tI tI-1">
	This is not required to set up a game. Alternatively, a Viewport, Stage and Camera can be set up manually using the Viewport Manager.
</span>

<span class="tI tI-1">
	Once the game has finished setting up, this emits the `didSetup` event on the Game object.
</span>

<span class="tI tI-1">
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

<span class="tI tI-1">
	Returns the Game object.
</span>

1. Sets the `Game.running` flag to `true`.
2. Emits the `willStart` event.
3. Starts the update and render loop.

<span class="tI tI-1">
	By default the game does not start on creation, and must be started with this method.  
	Will not execute if the game is already running.
</span>

<span class="tI tI-1">
	**Example:**
</span>

```javascript
const myGame = MobSin.Game()
	.start();
```


`.stop()`

<span class="tI tI-1">
	Returns the Game object.
</span>

1. Sets the `Game.running` flag to `false`.
2. Emits the `willStop` event.

<span class="tI tI-1">
	This is a *request* to stop the game loop. It will not take effect immediately, but at the beginning of the next available check. Therefore, an extra update tick may run even after calling `.stop()`.
</span>

<span class="tI tI-1">
	**Example:**
</span>

```javascript
const myGame = MobSin.Game()
	.start();

myGame.stop();
```

# .Sprite()

Returns a new instance of a `Sprite.Rectangle()` object unless specified otherwise.

Sprites are visible "*things*" in your game world. They have a position, bounding box, a fill colour or image and a plethora of other properties that can be modified.

All Sprites inherit from a `MobSin.Sprite._baseSprite` class and different types of Sprites extend the functionality of the base Sprite.

Inherits the `tween` object system.

```javascript
MobSin.Sprite(<game>, <name>, <fill>, <options>)
```

By just calling `MobSin.Sprite()` it will return a Rectangle Sprite. Different types of sprites can be instantiated by adding `.<Sprite Type>(...)`.

The following Sprite types are available: `MobSin.Sprite.Rectangle(...)` and `MobSin.Sprite.Circle(...)`.

### Parameters

**Object** `<game>`

<span class="tI tI-1">
	An already instantiated [Game](#game) object.
</span>

<span class="tI tI-1">
	All sprites must be instantiated into an existing game instance so that they can be handled by the global object manager.
</span>

**String** `<name>`

<span class="tI tI-1">
	A custom name for the Sprite.
</span>

<span class="tI tI-1">
	This name is used for identification as well as better indexing capabilities and searching the global object store.
</span>

**String** or **Object** or **NULL** `<fill>`

<span class="tI tI-1">
	A colour or image to fill the Sprite with.  
	Performs the same function as the `Sprite.setFill()` method.
</span>

<span class="tI tI-1">
	Providing a **string** will attempt to resolve the fill to a *colour*.  
	**Do not** give colour values with transparency. Instead use the `.alpha` property.  
	**Example:** `rgb(0, 255, 220)` or `#F00` or `cyan` etc.
</span>

<span class="tI tI-1">
	If an **object** is given, it must be a `MobSin.Asset` image object.  
	Most Sprite types will attempt to scale the image to their `bounds`.
</span>

<span class="tI tI-1">
	If `null` or any other non-valid fill value is given then the Sprite will be given a transparent colour fill by default.
</span>

**Object** `<options>`

<span class="tI tI-1">
	**String** `outline` - String colour value for a one-pixel thick outline of the Sprite (Default: `false`).  
	**Float** `alpha` - Alpha/transparency for the Sprite (`0` to `1`) (Default: `1`).  
	**Float** `scale` - The scale of this Sprite - scales its bounding box size. (Default: `1`).  
	**Integer** `z` - The z-index (Layer) of this Sprite (Default: `0`).
</span>

### Properties

`.fill`

<span class="tI tI-1">
	**Object**  
	Holds information about the Sprite's fill.  
</span>
<span class="tI tI-1">
	<span class="tI tI-1">
		`.type` - Type of fill. Can either be "`colour`" or "`image`".  
		`.data` - Data of the fill. The colour value or the image asset.
	</span>
</span>
<span class="tI tI-1">
	**Do not modify directly. Use the `.setFill()` method.**
</span>

`.outline`

<span class="tI tI-1">
	**String**  
	If not set to a falsey value, a one-pixel thick line of the given colour value will be drawn around the sprite.  
	Not affected by the `.alpha` property.  
	Typically used for debugging.
</span>

`.alpha`

<span class="tI tI-1">
	**Float**  
	Adjusts the alpha/transparency for the Sprite.  
	Must only be between `0` and `1`.  
	An alpha of `1` means the sprite is visible as normal. An alpha of `0` means the sprite is completely invisible.
</span>

`.scale`

<span class="tI tI-1">
	**Float**  
	Scales the Sprite's `bounds` by the given value.  
	By default all Sprites scale from their top-left origin point, however this can be changed if the Sprite offers an `anchor` property.
</span>

`.z`

<span class="tI tI-1">
	**Integer**  
	The z-axis value for this Sprite. Allows for 'layering' of Sprites over one-another.  
	A Sprite with a `z` value higher than another's will appear ontop of the other.  
	Sprites with the same `z` value will be ordered by their initial order in the object store.
</span>

### Methods

`.setFill(<fill>)`

<span class="tI tI-1">
	See the [Sprite <fill\> parameter](#parameters_1).
</span>

<span class="tI tI-1">
	**Example:**
</span>

```javascript
mySprite.setFill("rgb(100, 255, 255)");
```

## .Rectangle()

Returns a new instance of a rectangle Sprite object.

Extends and inherits the [base sprite](#sprite) parameters, properties and methods.

Rectangle sprite bounds are defined by a top-left point and a width and height.

```javascript
MobSin.Sprite(<game>, <name>, <fill>, <options>)
```

**or**

```javascript
MobSin.Sprite.Rectangle(<game>, <name>, <fill>, <options>)
```

### Parameters

**Object** `<options>`

<span class="tI tI-1">
	**Integer** `x` - The x-coordinate of the bounding box (Default: `0`).  
	**Integer** `y` - The y-coordinate of the bounding box (Default: `0`).  
	**Integer** `w` - The width of the bounding box (Default: `0`).  
	**Integer** `h` - The height of the bounding box (Default: `0`).  
	**Object** `anchor` - Moves the anchor/origin point:
	<span class="tI tI-1">
		**Float** `x` - The x-coordinate of the anchor point (Default: `0`).  
		**Float** `y` - The y-coordinate of the anchor point (Default: `0`).
	</span>
</span>

### Properties

`.bounds`

<span class="tI tI-1">
	**Object**  
	The bounding position and dimensions of this sprite.  
	Derived from `MobSin.shapes.Rectangle(...)`.
</span>
<span class="tI tI-2">
	`.x` - The x-coordinate of the origin point.  
	`.y` - The y-coordinate of the origin point.  
	`.w` - The width of the bounding box.  
	`.h` - The height of the bounding box.
</span>

`.anchor`

<span class="tI tI-1">
	**Object**  
	Sets the anchor / origin point of the sprite's coordinates.
</span>
<span class="tI tI-2">
	`.x` - The x-coordinate of the origin point.  
	`.y` - The y-coordinate of the origin point.
</span>

<span class="tI tI-1">
	By default the `x` and `y` origin point are located at `(0, 0)`, the top-left point, of the sprite.  
	`(1, 1)` would be the bottom-right, and `(0.5, 0.5)` would be the very center.
</span>

### Methods

```javascript
.resizeToImage(<scale>)
```

<span class="tI tI-1">
	Will not execute if the Sprite does not have an `image` fill type.  
	Automatically sets the bounding box's width and height to the same dimensions as the image's width and height.
</span>

<span class="tI tI-2">
	**Float** `<scale>`
</span>

<span class="tI tI-3">
	Scales the width and height value of the Sprite after modifying it (Default: `1`).
</span>

```javascript
.anchor.center()
```

<span class="tI tI-1">
	Sets the anchor point to `(0.5, 0.5)`.
</span>

## .Circle()

Returns a new instance of a circle Sprite object.

Extends and inherits the [base sprite](#sprite) parameters, properties and methods.

Circle sprites bounds are defined by a center point and a radius.

```javascript
MobSin.Sprite.Circle(<game>, <name>, <fill>, <options>)
```

### Parameters

**Object** `<options>`

<span class="tI tI-1">
	**Integer** `x` - The x-coordinate of the center point (Default: `0`).  
	**Integer** `y` - The y-coordinate of the center point (Default: `0`).  
	**Integer** `r` - The radius of the circle (Default: `0`).
</span>

### Properties

`.bounds`

<span class="tI tI-1">
	**Object**  
	The bounding position and dimensions of this sprite.  
	Derived from `MobSin.shapes.Circle(...)`.
</span>
<span class="tI tI-2">
	`.x` - The x-coordinate of the origin point.  
	`.y` - The y-coordinate of the origin point.  
	`.r` - The radius of the circle.
</span>