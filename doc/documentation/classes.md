# Game Classes

All top-level classes are namespaced under the global `Whirl` object. Therefore, any top-level class documented here is implied to be a property of the `Whirl` object unless specifically under a sub-header of another class.

All classes are initialised as you call them. You should not use the `new` keyword.

---

# Whirl

The global `Whirl` object contains all the classes, constructors and constants that make up the **Whirl** game engine.

```javascript
Whirl
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
	Returns a new [Camera](#camera) instance object.
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
	Used in [Viewport](#viewport) instantiation to indicate the engine to automatically create a new [Stage](#stage).
</span>

`.CAMERA`

<span class="tI tI-1">
	Used in [Viewport](#viewport) instantiation to indicate to the engine to automatically create a new [Camera](#camera).
</span>

---

# .Game()

Returns a new instance of a Game object.

The `Game` object is the actual running and workforce of the engine that updates your game, handles various object managers and deals with all interactions and rendering.

```javascript
Whirl.Game(<options>)
```

## Parameters

**Object** `<options>`

<span class="tI tI-1">
	Preset configuration options for the Game instance.  
	**Boolean** `ignoreWarnings` - Ignore debug warnings (Default: `true`).  
	**HTMLElement** `keyElement` - Element that listens for keyboard input events (Default: `document.body`).
	**Object** or **`false`** `input` - Enable or disable certain input event listeners to be disabled or enabled. If you have a very large amount of game objects and are not using any input methods then disabling certain listeners may boost performance.  
	Set this to `false` instead to disable all inputs - useful if you just want to create some non-interactable animations or similar.  
</span>
<span class="tI tI-2">
	**Boolean** `mouse` - Whether mouse event listeners should be attached to the document and existing and subsequent viewports (Default: `true`).  
	**Boolean** `keyboard` - Whether keyboard event listeners should be attached to the document (Default: `true`).  
	**Boolean** `preventDefault` - Whether any events (mouse or keyboard) fired should have their default browser behaviour prevented (Default: `false`).
</span>

<span class="tI tI-1">
	Any other properties given to the `<options>` object will be attached to the `Game.config` object, too.
</span>

## Properties

`.config`

<span class="tI tI-1">
	**Object**  
	Persistent configuration of the Game instance.  
	Also includes any additional properties given when initially creating a game instance.
</span>
<span class="tI tI-2">
	`.ignoreWarnings` - Ignore debug warnings.  
	`.input` - See the `input` argument [in the game instantiation parameters](#parameters). After initialisation these properties should not be modified directly.
</span>

`.frameRate` (Read-only)

<span class="tI tI-1">
	**Integer**  
	Limits the maximum frames per second (FPS).  
	Default `60`.
</span>

`.frameCount` (Read-only)

<span class="tI tI-1">
	**Integer**  
	The number of update frames elapsed since the game's start.  
	Will only start counting once the game has been started with the `Game.start()` method, not when the game is instantiated.
</span>

## Methods

`.setup(<options>)`

<span class="tI tI-1">
	Returns the Game object.
</span>

<span class="tI tI-1">
	**Object** `<options>`
</span>

<span class="tI tI-2">
	**String** `canvas` - Selector for an HTML5 `<canvas>` element.  
	**String** `canvasWidth` or `cW` - Width in pixels to resize the canvas element to.  
	**String** `canvasHeight` or `cH` - Height in pixels to resize the canvas element to.  
	If a canvas width or height value is not given then the canvas will not be resized.  
	**Function** `setup` - Called *after* the game has finished setting up (Called with the `didSetup` event).  
	**Funtion** `update` - Called when the game will update - *before* the update loop occurs each frame (Called with the `willUpdate` event).  
	**Array** `assets` - Array of assets to be loaded before the game is started. Implicitely calls the asset manager's `.load` method.
</span>

<span class="tI tI-1">
	Automatically sets up the game with a [Viewport](#viewport), [Stage](#stage) and [Camera](#camera).
</span>

<span class="tI tI-1">
	This is not required to set up a game. Alternatively, a [Viewport](#viewport), [Stage](#stage), [Camera](#camera) and assets can be set up manually. See the article ["Advanced: Setting Up From Scratch"](../../getting-started#advanced-setting-up-from-scratch).
</span>

<span class="tI tI-1">
	Once setup has completed, the `didSetup` event is emitted on the game object and game loop is automatically started.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
function gameSetup(data) {
	// Create objects, import assets, insert plugins, etc.
}

function gameLoop(data) {
	// Update object positions, detect key presses, animate sprites, etc.
}

const myGame = Whirl.Game()
	.setup({
		setup: gameSetup,
		update: gameLoop,

		canvas: "#myCanvas",
		canvasWidth: 400,
		canvasHeight: 400
	});
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
	**Example(s):**
</span>

```javascript
const myGame = Whirl.Game()
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
	**Example(s):**
</span>

```javascript
const myGame = Whirl.Game()
	.start();

myGame.stop();
```

---

# .Sprite()

Returns a new instance of a `Sprite.Rectangle()` object unless specified otherwise.

Sprites are visible "*things*" in your game world. They have a position, bounding box, a fill colour or image and a plethora of other properties that can be modified.

All Sprites inherit from a `Whirl.Sprite._baseSprite` class and different types of Sprites extend the functionality of the base Sprite.

Inherits the [tween object system](../systems/#animation-tweens).

```javascript
Whirl.Sprite(<Game>, <name>, <fill>, <options>)
```

By just calling `Whirl.Sprite()` it will return a Rectangle Sprite. Different types of sprites can be instantiated by adding `.<Sprite Type>(...)`.

The following Sprite types are available: `Whirl.Sprite.Rectangle(...)` and `Whirl.Sprite.Circle(...)`.

### Parameters

**Object** `<Game>`

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
	Performs the same function as the `.setFill(...)` method.
</span>

<span class="tI tI-1">
	Providing a **string** will attempt to resolve the fill to a *colour*.  
	**Do not** give colour values with transparency. Instead use the `.alpha` property.  
	**Example(s):** `rgb(0, 255, 220)` or `#F00` or `cyan` etc.
</span>

<span class="tI tI-1">
	If an **object** is given, it must be a `Whirl.Asset` image object.  
	Most Sprite types will attempt to scale the image to their `bounds`.
</span>

<span class="tI tI-1">
	If `null` or any other non-valid fill value is given then the Sprite will be given a transparent colour fill by default.
</span>

**Object** `<options>`

<span class="tI tI-1">
	**String** `outline` - String colour value for a one-pixel thick outline of the Sprite (Default: `false`).  
	**Float** `alpha` - Alpha/transparency for the Sprite (`0` to `1`) (Default: `1`).  
	**Float** `scale` - The scale of this Sprite - scales its bounding box size (Default: `1`).  
	**Integer** `z` - The z-index (Layer) of this Sprite (Default: `0`).
</span>

### Properties

`.name`

<span class="tI tI-1">
	**String**  
	The name of the Sprite.
</span>

<span class="tI tI-1">
	Used by the global object manager to search for Sprites.
</span>

`._fill` (Read-only)

<span class="tI tI-1">
	**Object**  
	**Do not modify directly. Use the `.setFill()` method.**  
	Information about the Sprite's fill.  
</span>
<span class="tI tI-2">
	`.type` - Type of fill. Can either be "`colour`" or "`image`".  
	`.data` - Data of the fill. The colour value or the image asset.
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
	Returns the Sprite object.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
mySprite.setFill("rgb(100, 255, 255)");

mySprite.setFill("#F00");

mySprite.setFill("blue");
```

`.tween.`

<span class="tI tI-1">
	See the [tween object system](../systems/#animation-tweens).
</span>

---

## .Rectangle()

Returns a new instance of a rectangle Sprite object.

Extends and inherits the [base sprite](#sprite) parameters, properties and methods.

Rectangle sprite bounds are defined by a top-left point and a width and height.

```javascript
Whirl.Sprite(<Game>, <name>, <fill>, <options>)
// or
Whirl.Sprite.Rectangle(<Game>, <name>, <fill>, <options>)
```

### Parameters

**Object** `<options>`

<span class="tI tI-1">
	**Number** `x` - X-coordinate of the bounding box (Default: `0`).  
	**Number** `y` - Y-coordinate of the bounding box (Default: `0`).  
	**Number** `w` - Width of the bounding box (Default: `0`).  
	**Number** `h` - Height of the bounding box (Default: `0`).  
	**Object** `anchor` - Moves the anchor/origin point:
	<span class="tI tI-1">
		**Float** `x` - X-coordinate of the anchor point (Default: `0`).  
		**Float** `y` - X-coordinate of the anchor point (Default: `0`).
	</span>
</span>

### Properties

`.bounds`

<span class="tI tI-1">
	**Object**  
	The bounding position and dimensions of this sprite.  
	Derived from `Whirl.shapes.Rectangle(...)`.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the bounding box.  
	`.y` - Y-coordinate of the bounding box.  
	`.w` - Width of the bounding box.  
	`.h` - Height of the bounding box.
</span>

`.anchor`

<span class="tI tI-1">
	**Object**  
	Sets the anchor / origin point of the sprite's coordinates.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the origin point.  
	`.y` - Y-coordinate of the origin point.
</span>

<span class="tI tI-1">
	By default the `x` and `y` origin point are located at `(0, 0)`, the top-left point of the sprite.  
	`(1, 1)` would be the bottom-right and `(0.5, 0.5)` would be the very center.
</span>

### Methods

`.resizeToImage(<scale>)`

<span class="tI tI-1">
	Will not execute if the Sprite does not have an `image` fill type.  
	Automatically sets the bounding box's width and height to the same dimensions as the image's width and height.  
	Returns the Sprite object.
</span>

<span class="tI tI-2">
	**Float** `<scale>`
</span>

<span class="tI tI-3">
	Scales the width and height value of the Sprite after modifying it (Default: `1`).
</span>

`.anchor.center()`

<span class="tI tI-1">
	Sets the anchor point to `(0.5, 0.5)`.  
	Returns the Sprite object.
</span>

---

## .Circle()

Returns a new instance of a circle Sprite object.

Extends and inherits the [base sprite](#sprite) parameters, properties and methods.

Circle sprites bounds are defined by a center point and a radius.

```javascript
Whirl.Sprite.Circle(<Game>, <name>, <fill>, <options>)
```

### Parameters

**Object** `<options>`

<span class="tI tI-1">
	**Number** `x` - X-coordinate of the center point (Default: `0`).  
	**Number** `y` - Y-coordinate of the center point (Default: `0`).  
	**Number** `r` - Radius of the circle (Default: `0`).
</span>

### Properties

`.bounds`

<span class="tI tI-1">
	**Object**  
	The bounding position and dimensions of this Sprite.  
	Derived from `Whirl.shapes.Circle(...)`.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the bounding box.  
	`.y` - Y-coordinate of the bounding box.  
	`.r` - Radius of the circle.
</span>

---

# .Camera()

Returns a new instance of a Camera object.

Cameras serve as the view into your world (the [Stage](#stage)). Scrolling the camera around lets you look around different parts of your world. Cameras can be scrolled around, lock onto objects, zoom in/out, apply effects and more.

Inherits the [tween object system](../systems/#animation-tweens).

```javascript
Whirl.Camera(<Game>, <options>)
```

### Parameters

**Object** `<Game>`

<span class="tI tI-1">
	An already instantiated [Game](#game) object.
</span>

**Object** `<options>`

<span class="tI tI-1">
	**Number** `.x` - X-coordinate of the bounding box (Default: `0`).  
	**Number** `.y` - Y-coordinate of the bounding box (Default: `0`).  
	**Number** `.w` - Width of the camera view (Default: `0`).  
	**Number** `.h` - Height of the camera view (Default: `0`).  
	**Object** `anchor` - Moves the anchor/origin point:
	<span class="tI tI-1">
		**Float** `x` - X-coordinate of the anchor point (Default: `0`).  
		**Float** `y` - Y-coordinate of the anchor point (Default: `0`).
	</span>
	**Object** `scroll` - Scrolls the Camera view around the game world:
	<span class="tI tI-1">
		**Float** `x` - X-coordinate of the scroll position (Default: `0`).  
		**Float** `y` - Y-coordinate of the scroll position (Default: `0`).
	</span>
	**Float** `zoom` - Zoom level of the Camera (Default: `1`).  
	**Boolean** `roundPixels` - Whether to round the scroll position to the nearest whole number (Default `true`).
</span>

### Properties

`.bounds`

<span class="tI tI-1">
	**Object**  
	The position and dimensions of the Camera on screen.  
	Derived from `Whirl.shapes.Rectangle(...)`.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the bounding box.  
	`.y` - Y-coordinate of the bounding box.  
	`.w` - Width of the bounding box.  
	`.h` - Height of the bounding box.
</span>
<span class="tI tI-1">
	Note that the `.bounds` property defines where the Camera will draw to *on the screen*, not where it will draw from *in the world*.  
	Use the `.scroll` property to move around in space.
</span>
<span class="tI tI-1">
	The width and height properties do not cut off rendering on the screen, but are used to determine render culling zones and no-update zones.
</span>

`.anchor`

<span class="tI tI-1">
	**Object**  
	Sets the anchor / origin point of the camera's coordinates and zoom.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the origin point.  
	`.y` - Y-coordinate of the origin point.
</span>
<span class="tI tI-1">
	Has no effect if the Camera is following an object.
</span>

`._followObject` (Read-only)

<span class="tI tI-1">
	**Object**  
	**Do not modify directly. Use the `.follow(...)` and `.unfollow()` methods.**  
	Reference to the object that the Camera is following.
</span>

`.scroll`

<span class="tI tI-1">
	**Object**  
	The position in the world that the Camera is observing. Moves the camera's view around the game world.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the scroll position.  
	`.y` - Y-coordinate of the scroll position.
</span>
<span class="tI tI-1">
	Changing this will have no effect if the Camera is following an object (`._followObject`) as its scroll position is bound to the object it is following.
</span>

`.zoom`

<span class="tI tI-1">
	**Number**  
	The zoom of the camera. Scales what the camera sees up/down by the given amount.
	Will always zoom around the anchor point.  
	A zoom level of `1` (Default) means no scaling / a normal view.  
	A zoom level of `2` would zoom *in* twice the normal amount - you would see half of normal view.  
	A zoom level of `.5` would zoom *out* twice the normal amount - you would see double the amount of the normal view.
</span>

`.roundPixels`

<span class="tI tI-1">
	Rounds the scroll (`.scroll`) position to the nearest whole number if the Camera is locked to an object.
</span>

### Methods

`.follow(<Sprite>, <lerp>)`

<span class="tI tI-1">
	Makes the camera follow the given Sprite by "locking" the camera's center point to the Sprite position.  
	Returns the Camera object.
</span>

<span class="tI tI-2">
	**Object** `<Sprite>`
</span>
<span class="tI tI-3">
	Sprite object that the Camera should follow.  
</span>

<span class="tI tI-2">
	**Float** `<lerp>` (Optional) (Default: `1`)
</span>
<span class="tI tI-3">
	Implicitely calls `.setLerp` with the given `<lerp>` value.
</span>

<span class="tI tI-1">
	When a Camera follows a Sprite it will attempt to keep the Sprite in the exact center of the screen each update, moving the scroll (`.scroll`) position to the center of the Sprite's bounds by the linear interpolation value.  
	Invokes the `.anchor.center()` method to center the Camera on the Sprite.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
const mySprite = Whirl.Sprite(myGame, "Blocky", "#F00", {
	x: 100,
	y: 75,
	w: 50,
	h: 50
});

const myCamera = Whirl.Camera(myGame, {
	w: 400,
	h: 400
})
	.follow(mySprite);
```

`.unfollow()`

<span class="tI tI-1">
	Stops the camera following any object it is currently following (`._followObject`).  
	Returns the Camera object.
</span>

<span class="tI tI-1">
	When "unlocked", the scroll (`.scroll`) will stay in its last position that it was locked at, essentially not moving.
</span>

<span class="tI tI-1">
	The zoom (`.zoom`) and anchor (`.anchor`) positions remain unchanged throughout the time that the Camera is locked, so will still be the same after unlocking.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
myCamera.unfollow();
```

`.setLerp(<lerp>)`

<span class="tI tI-1">
	Sets the linear interpolation that the camera uses to follow the Sprite.  
	Has no effect if the Camera is not following an object (`._followObject`).  
	Returns the Camera object.
</span>

<span class="tI tI-2">
	**Float** `<lerp>`
</span>
<span class="tI tI-3">
	Linear interpolation value to use.  
	Value between `0` and `1`. `1` means the Camera is locked to the object, anything below will make the Camera move slower to catch up to the Sprite.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
myCamera.setLerp(1);

myCamera.setLerp(.6);

myCamera.setLerp(.1);
```

`.centerOn(<Sprite>)`

<span class="tI tI-1">
	Moves the Camera's scroll position so that the Camera is centered on the given Sprite.  
	Returns the Camera object.
</span>

<span class="tI tI-2">
	**Object** `<Sprite>`
</span>
<span class="tI tI-3">
	Sprite object that Camera centers on.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
myCamera.centerOn(mySprite);
```

`.anchor.center()`

<span class="tI tI-1">
	Sets the anchor point to `(0.5, 0.5)`.  
	Returns the Camera object.
</span>

`.tween.`

<span class="tI tI-1">
	See the [tween object system](../systems/#animation-tweens).
</span>

---

# Stage

A stage is the 'world' of your game that you put your game objects into. It used for keeping track of and updating game objects in the world.

Objects not contained in a Stage are not rendered or updated.

Stages and their contents are rendered using a [Viewport](#viewport) and will update by themselves even when not being rendered.

Inherits the [child object system](../systems/#child-hierarchy).

```javascript
<Game>.stageManager.add(<name>, <options>)
```

`<Game>` represents an already instantiated [game instance](#game).

The above code would return a reference to the Stage object as contained in the Stage Manager.

### Parameters

**String** `<name>`

<span class="tI tI-1">
	A custom name for the Stage.
</span>

<span class="tI tI-1">
	This name is used for identification and is searched and indexed by the Stage Manager.
</span>

**Object** `<options>`

<span class="tI tI-1">
	**Number** `.x` - X-coordinate of the stage limits (Default: `0`).  
	**Number** `.y` - Y-coordinate of the stage limits (Default: `0`).  
	**Number** `.w` - Width of the stage limits (Default: `0`).  
	**Number** `.y` - Height of the stage limits (Default: `0`).
</span>

### Properties

`.name`

<span class="tI tI-1">
	**String**  
	The name of the Stage.
</span>

<span class="tI tI-1">
	Used by the stage and global object manager to search for Stages.
</span>

`.limits`

<span class="tI tI-1">
	**Object**  
	The limits of the game world.  
	Objects with physics applied cannot leave the limits of the game world.  
	Derived from `Whirl.shapes.Rectangle(...)`.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the stage limits.  
	`.y` - Y-coordinate of the stage limits.  
	`.w` - Width of the stage limits.  
	`.h` - Height of the stage limits.
</span>

### Methods

`.child.`

<span class="tI tI-1">
	See the [child object system](../systems/#child-hierarchy).
</span>

<span class="tI tI-1">
	Objects must be contained inside a Stage using the child object system.  
	Only objects that are children of a Stage are updated and/or rendered.
</span>

---

# Viewport

A viewport is a screen that renders to an HTML5 Canvas.

Viewports hold the render settings used by the canvas element and require a [Stage](#stage) and [Camera](#camera) to use for rendering.

```javascript
<Game>.viewportManager.add(<name>, <canvas>, <Stage>, <Camera>, <options>)
```

`<Game>` represents an already instantiated [game instance](#game).

The above code would return a reference to the Viewport object as contained in the Viewport Manager.

### Parameters

**String** `<name>`

<span class="tI tI-1">
	A custom name for the Viewport.
</span>

<span class="tI tI-1">
	This name is used for identification and is searched and indexed by the Viewport Manager.
</span>

**String** `<canvas>`

<span class="tI tI-1">
	Selector for a `<canvas>` element contained in the DOM.  
	Performs the same function as the `.setCanvas(...)` method.
</span>

**Object** or **String** `<Stage>`

<span class="tI tI-1">
	An already instantiated [Stage](#stage) object.  
	Performs the same function as the `.setStage(...)` method.
</span>

<span class="tI tI-1">
	Alternatively, `Whirl.STAGE` can be given and a new [Stage](#stage) object will be automatically created and associated with the Viewport.
</span>

**Object** or **String** `<Camera>`

<span class="tI tI-1">
	An already instantiated [Camera](#camera) object.  
	Performs the same function as the `.setCamera(...)` method.
</span>

<span class="tI tI-1">
	Alternatively, `Whirl.CAMERA` can be given and a new [Camera](#camera) object with the same dimensions will be automatically created and associated with the Viewport.
</span>

**Object** `<options>`

<span class="tI tI-1">
	**Number** `x` - X-coordinate of the bounding box (Default: `0`).  
	**Number** `y` - Y-coordinate of the bounding box (Default: `0`).  
	**Number** `w` - Width of the bounding box (Default: `0`).  
	**Number** `h` - Height of the bounding box (Default: `0`).  
	**Integer** `cW` - Resize the `<canvas>` element to a given width.  
	**Integer** `cH` - Resize the `<canvas>` element to a given height.  
	**Boolean** `imageSmoothing` - Canvas anti-aliasing enabled or not (Default: `true`).  
	**Boolean** `clear` - Clear canvas at the beginning of each render loop (Default: `true`).  
	**Boolean** `clip` - Clip out anything rendered beyond the Viewport's boundaries (Default: `true`).  
	**Boolean** `fitCamera` - Resize and move the [Camera](#camera) to the same coordinates and dimensions as the Viewport (Default: `true`).
</span>

### Properties

`.name`

<span class="tI tI-1">
	**String**  
	The name of the Viewport.
</span>

<span class="tI tI-1">
	Used by the viewport and global object manager to search for Viewports.
</span>

`.bounds`

<span class="tI tI-1">
	**Object**  
	The bounding position and dimensions of this viewport on the screen.  
	Derived from `Whirl.shapes.Rectangle(...)`.
</span>
<span class="tI tI-2">
	`.x` - X-coordinate of the bounding box.  
	`.y` - Y-coordinate of the bounding box.  
	`.w` - Width of the bounding box.  
	`.h` - Height of the bounding box.
</span>
<span class="tI tI-1">
	Viewports should be static. Object clipping and screen clearing is based on the `.bounds` property and therefore it **should not** be modified after the initial definition in the `<options>` parameter.
</span>

`.c` (Read-only)

<span class="tI tI-1">
	**Object**  
	**Do not modify directly. Use the `.setCanvas(...)` method.**  
	Reference to the HTML5 canvas element that the viewport will render to.  
	This holds the actual element node, not just a selector or a copy.
</span>

`.ctx` (Read-only)

<span class="tI tI-1">
	**Object**  
	**Do not modify directly. Use the `.setCanvas(...)` method.**  
	Reference to the drawing context of the viewport's canvas.
</span>

`.activeStage` (Read-only)

<span class="tI tI-1">
	**Object**  
	**Do not modify directly. Use the `.setStage(...)` method.**  
	Reference to the [Stage](#stage) being rendered.
</span>

`.activeCamera` (Read-only)

<span class="tI tI-1">
	**Object**  
	**Do not modify directly. Use the `.setCamera(...)` method.**  
	Reference to the [Camera](#camera) being used for rendering.
</span>

`.imageSmoothing`

<span class="tI tI-1">
	**Boolean**  
	Whether scaled images are smoothed (anti-aliased) or not.  
	Useful for games that use pixel art a lot.
</span>

`.clear`

<span class="tI tI-1">
	**Boolean**  
	Clear the canvas at the beginning of every render loop.  
	Only the area that the viewport occupies on the canvas is cleared. If the viewport has the same dimensions as the canvas then the entire canvas will be cleared.
</span>

`.clip`

<span class="tI tI-1">
	**Boolean**  
	Clip out anything in the entire canvas that is not within the viewport's boundaries.  
	It is recommended to disable this if there is more than one viewport being used on the same canvas.
</span>

### Methods

`.setCanvas(<canvas>)`

<span class="tI tI-1">
	Sets the HTML5 canvas element to render to.  
	Also see the `.c` and `.ctx` [viewport properties](#properties_7).  
	Returns the Viewport object.
</span>

<span class="tI tI-2">
	**String** `<canvas>`
</span>
<span class="tI tI-3">
	Selector string for an HTML5 `<canvas>` element.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
myViewport.setCanvas("#myCanvas");
```

`.setStage(<Stage>)`

<span class="tI tI-1">
	Sets the current [stage](#stage) to be rendered.  
	Also see the `.activeStage` [viewport property](#properties_7).  
	Returns the Viewport object.
</span>

<span class="tI tI-2">
	**Object** `<Stage>`
</span>
<span class="tI tI-3">
	An already instantiated [Stage](#stage) object.
</span>

<span class="tI tI-3">
	The `Whirl.STAGE` constant can be given instead and a new [Stage](#stage) object will be automatically created with the same position and dimensions as the viewport.
</span>

`.setCamera(<Camera>)`

<span class="tI tI-1">
	Sets the current [camera](#camera) to be used for rendering.  
	Also see the `.activeCamera` [viewport property](#properties_7).  
	Returns the Viewport object.
</span>

<span class="tI tI-2">
	**Object** `<Camera>`
</span>
<span class="tI tI-3">
	An already instantiated [Camera](#camera) object.
</span>

<span class="tI tI-3">
	The `Whirl.CAMERA` constant can be given instead and a new [Camera](#camera) object will be automatically created with the same position and dimensions as the viewport.
</span>

<span class="tI tI-1">
	If the `fitCamera` [viewport parameter](#parameters_6) is not explicitly set to the `false` then the given [camera](#camera) will be repositioned and resized to the same position and dimensions of the viewport.
</span>

`.bringCamera()`

<span class="tI tI-1">
	Returns the Viewport object.
</span>

<span class="tI tI-1">
	Moves the active [camera](#camera)'s `scroll` position to the top-left point of the viewport's position.
</span>

<span class="tI tI-1">
	If the viewport is placed anywhere that isnt `(0, 0)` it is recommended to bring the [camera](#camera) to avoid discrepancies between rendering zones and unwanted clipping of objects by the viewport after they have been rendered.
</span>

<span class="tI tI-1">
	**Example(s):**
</span>

```javascript
const myCamera = Whirl.Camera(myGame, {
	x: 50,
	y: 75,
	w: 200,
	h: 200
});

const myViewport = myGame.viewportManager.add(..., ..., ..., myCamera, {
	x: 0,
	y: 0,
	w: 400,
	h: 400
})
	.bringCamera();

// The camera is now moved from (50, 75) and 200 width and height to (0, 0) and 400 width and height.
```
