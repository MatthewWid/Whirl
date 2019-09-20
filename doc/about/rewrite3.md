# 3.0.0 Notable Changes

Version 3.0 (Informally titled "Rewrite3") of Whirl features a myriad of internal and external changes that bring performance benefits, a greatly simplified API and more consistent naming and structuring of game objects and interfaces.

## Breaking Changes

Listed below are all changes that affect the *public*ly exposed API that may require a migration process to facilitate.

### Large Breaking Changes

Changes that alter the fundamental architecture or workflow and usage of the framework and may require a larger amount of effort to migrate into.

* **Modern JavaScript syntax with ES6 has been embraced and functional constructors have been replaced with ES6 `class`es. The process of instantiation from the user-facing API will remain the same, however compatibility with older browsers such as Internet Explorer may be hindered** (IE <= 12)**.**
* *Systems* have been turned into *Mixins* and are now statically applied to game classes. Mixins are given to the object during instantiation and extra mixins cannot be added or removed after instantation - this means that the behaviour of an object is much more predictable and no availability-checking has to be performed beforehand.
* Public-facing object managers have been removed. Objects that are managed such as Viewports, Stages, Assets and Tweens are now handled internally upon instantiation significantly reducing the complexity of setting up a game from scratch (without the `setup` module).
* Viewports, Stages and Sprites no longer take a `name` argument during instantation. To retrieve an unknown object either store the newly instantiated object in your own variable or perform a lookup in the object manager by its unique ID. `Viewport(game, name, ...args)` -> `Viewport(game, ...args)`.
* The `Camera` game object has been removed in favour of performing all render and view-related transforms, effects and filters in the `Viewport`.
* Change `Viewport` constructor parameters to only an instance of the `Game` and an object of `option`s. `Viewport(Game, name, canvas, Stage, Camera, presets)` -> `Viewport(Game, options)`. During Viewport instantiation the `canvas`, `Stage` and `presets` arguments are now passed in as properties in the `options` object.

### Small Breaking Changes

Changes that are still breaking assuming the features are used, but are still small in nature - for example, property or method name changes, return/input data type changes, etc.

* Game configuration variables `ignoreWarnings`, `mouse`, `keyboard` and `preventDefault` have been renamed to `debug`, `input mouse`, `input keyboard` and `input preventDefault` respectively and `keyElement` and `mouseElement` have been removed.
* Rename `Whirl.Sprite._BaseSprite` has been moved and renamed to `Whirl.Base`. All game objects (regardless of being a Sprite or not) must inherit from the Base game object to be able to be inserted into the object store. For basic usage this change should not be noticable, however more advanced usage such as plugins and custom Sprites may be broken by this change.
* `Rectangle#getMidpoint` method has been renamed to `midpoint` and is now a getter instead of a method. `Rectangle.getMidpoint()` -> `Rectangle.midpoint`.
* `Whirl.keys.getByKeyCode` has been renamed to `Whirl.keys.getByCode`.
* `Object.event#emit` now returns a Boolean indicating whether there were any existing event handlers to handle the emitted event or not (Instead of returning the source object itself).
* Change attached metadata of emitted data from `Object.event#emit` from `_eventId` and `_object` to `_eId` and `_source` respectively.
* `Object.event#onOnce` renamed to `#once`.
* `Object.event#on` and `Object.event#once` now return the `EventMixin` attached to the source object instead of the source object itself. This allows for multiple events to be attached at the same time (`Object.event.on().on()`) instead of having to re-reference the objects event mixin each time (`Object.event.on().event.on()`).
* `Object.event#removeById` renamed to `Object.event#remove`.

## Feature Additions (Non-Breaking)

Listed below are all changes that do not affect the current public API and how it is used which may include **feature additions**, performance improvements, miscellaneous internal changes and minor bug fixes.

* `Object.event#remove` (previously `Object.event#removeById`) can now be called by giving an event ID *or* an instance of an event as the second argument.
* `Circle` shape can now be instantiated by providing an instance of a `Point` as the first argument and a value for the radius in the second instead of three integers. `Whirl.shapes.Circle(Whirl.shapes.Point(50, 50), 100)`.
* `Circle#isPointInside` and `Rectangle#isPointInside` methods now also accept an instance of `Point` as their first argument, instead.
* `Rectangle` shape can now be instantiated by providing two instances of a `Point` shape that define the top-left and bottom-right corner as the first and second argument respectively.
* `Line` shape can now be instantiated by providing two instances of a `Point` shape that define the start and end-point of the line respectively.
* Add `Rectangle.area` getter that returns the area of the rectangle instance.
* Add `Rectangle.vertices` getter that returns an array of `Point` instances representing each vertex making up the rectangle in the following order: top-left, top-right, bottom-right and bottom-left.
* Add `Point#distanceFrom` method that returns the distance from either a given set of coordinates `x` and `y` or an instance of another `Point`.
* Add `Line.length` getter that returns the length of the line.
* Add `Line.vertices` getter that returns an array of two `Point` shapes that represent the coordinates of the start and end-point of the line.
* Events are now stored as `Event` objects instead of storing the callback function directly, meaning that event metadata can be attached *without* modifying the original given function object. This would previously cause issues as assigning the same callback function to multiple event listeners would cause all but the last event ID to be lost thus making it impossible to remove the event listener later on.
