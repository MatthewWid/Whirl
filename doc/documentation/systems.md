# Object Systems

Object systems are reusable pieces of code that can be attached to game objects during instantiation (Think React hooks, if you're familiar).

Objects instantiated this way are stored in [the global store](#the-global-store) unless specifically ordered not to be.

You can read more about instantiating your own custom game elements in [the customisation section](../customisation), but for the most part in-built game objects (such as viewports, stages, sprites, plugins, etc.) will instantiate themselves in the game instance for you.

To attach a game system to an object that is not already equpped with one you can call the `attachSystem` method. Objects must be instantiated in a game instance first to have a game system attached to them.

```javascript
[game].object.attachSystem(<obj>, <systems>)
```

<span class="tI tI-1">
	**Object** `<obj>`
</span>
<span class="tI tI-2">
	Object to attach the event system(s) to.
</span>

<span class="tI tI-1">
	**Object** `<systems>`
</span>
<span class="tI tI-2">
	Object indicating list of systems to attach to the given object.  
	The property value must be set to `true` to register.  
	The current valid object systems are:
</span>
<span class="tI tI-3">
	• `event`  
	• `tween`  
	• `child`
</span>

**Example(s):**

Creating a custom sprite and then attaching the `event` and `tween` object system to it.

```javascript
// Create a new game instance and an empty object.
const game = Whirl.Game();
const customSprite = {};
// Instantiate the empty object into the game instance.
game.object.init(customSprite, "Custom.Sprite");

// Attach the `event` and `tween` system.
game.object.attachSystem(customSprite, {
	event: true,
	tween: true
});
```

Object systems can also be attached with the `init` method during instantiation as a third argument.

# The Global Store

Most objects instantiated within a Whirl game instance are stored in what is called "The Global Store". This is a persistent list of all objects that exist in the current game instance.

You can see the raw global store of your game instance under `[game].globalStore` but you should **never modify this directly**. You should also never rely on the order of the array representing the raw global store as it can change between game updates, object modification and other various ways.

To traverse the global store you should use the provided methods under the `object` property of a game instance.

```javascript
[game].object
```

## Methods

For all "Get ..." methods if no results are found (meaning no objects are matched) then an empty array will be returned (`[]`).

### Get All

Returns an array of every item in the global store.

```javascript
[game].object.getAll()
```

The returned array has no inherent ordering and thus the order the of the returned array will not necessarily be consistent on every call.

### Get By ID

Returns an array of objects in the global store whose `_id` property match the given `<id>` search value.

All objects that are instantiated within a game instance (Regardless of whether they are stored within the global store or not) are assigned a unique `_id` integer value that uniquely identifies every object created under the game instance since the game was instantiated.

Keep in mind all IDs should be unique so although an array may be returned it should never have more than one 

```javascript
[game].object.getById(<id>)
```

<span class="tI tI-1">
	**Integer** `<id>`
</span>
<span class="tI tI-2">
	Unique ID number by which to search the global store by.
</span>

### Get By Name

Returns an array of objects in the global store whose `name` property matches the given `<name>` search string.

Viewports, Stages, Sprites and Assets all a have `name` property that you provide when creating a new instance of them.

```javascript
[game].object.getByName(<name>)
```

<span class="tI tI-1">
	**String** `<name>`
</span>
<span class="tI tI-2">
	String to match an object's name in the global store.
</span>

### Get By Type

Returns an array of objects in the global store whose `_type` property matches the given `<type>` string.

All objects instantiated under a game instance give a name for their "type" that identifies where the object came from and its own class. For example, a viewport's `_type` is `Whirl.Viewport`, and a sprite's `_type` is `Whirl.Sprite`.

To learn more about types and making your own see [the customisation section](../customisation).

```javascript
[game].object.getByType(<type>)
```

<span class="tI tI-1">
	**String** `<type>`
</span>
<span class="tI tI-2">
	String to match an object's type in the global store.
</span>

### Destroy By ID

Removes an object from the global store given an `<id>` property and returns the removed object. Returns `false` if no object to remove is found.

*Use with caution:*  
This method directly modifies the global store and therefore should not be used unless there are **no other references to the object anywhere else in the game instance** (such as being stored in a stage world, viewport, camera, etc.). Doing so may break functionality in unexpected and sometimes hard to debug ways.

```javascript
[game].object.destroyById(<id>)
```

<span class="tI tI-1">
	**Integer** `<id>`
</span>
<span class="tI tI-2">
	Unique ID number by which to search the global store by and match an object to be removed.
</span>

# Custom Events

Whirl uses a dynamic event system to emit information from objects that can be picked up by listeners on that object. Many Whirl objects come with their own premade events, but you can also make your own that listen on or emit events from any object that has the event system attached to it.

Events are identified by a given name. There can be multiple listeners on a single event that will all fire when that even is called. Events are called in the order that the listeners were initially added in.

Events do not have to be initialised beforehand. You can listen pn any event name and it will be fired if something emits on that same name.

```javascript
[object].event
```

Attach the event system to a game object:

```javascript
[game].object.attachSystem([object], {event: true})
```

## Methods

### On

Adds a new event listener for the given event name.

```javascript
[object].event.on(<name>, <callback>, <once>)
```

<span class="tI tI-1">
	**String** `<name>`
</span>
<span class="tI tI-2">
	Name of the event to listen on.
</span>

<span class="tI tI-1">
	**Function** `<callback>`
</span>
<span class="tI tI-2">
	Callback function that is called every time an event is emitted on the given event name.  
	Takes a single object parameter that contains the emitted data.  
	The object paramater also has attached to it the following properties:
</span>
<span class="tI tI-3">
	`_eventId` - The ID of the current event listener.  
	`_object` - The object that the event is being called on.
</span>

<span class="tI tI-1">
	**Boolean** `<once>` (Optional) (Default: `false`)
</span>
<span class="tI tI-2">
	If set to `true` will remove the event listener after one emit to the event name.
</span>

**Example(s):**

Listen for the event `hit` on the `myPlayer` object that when called upon will damage the player by the given `damage` value.

```javascript
myPlayer.event.on("hit", (data) => {
	myPlayer.data.health -= data.damage;
});
```

Listen for the event `loadedImage` that is listened to once and then when emitted to stops listening.

```javascript
myPlayer.event.on("loadedImage", (data) => {
	console.log("Player image loaded!");
}, true);
```

### On Once

Implicitly the same as `.event.on` but with the `<once>` argument set to `true`.

See the ['On' method parameters](#on) as they are the same except with the last parameter omitted.

**Example(s):**

```javascript
myPlayer.event.onOnce("loadedImage", (data) => {
	console.log("Player image loaded!");
});
```

### Emit

Emits an event on the given name with given data.

```javascript
[object].event.emit(<name>, <data>)
```

<span class="tI tI-1">
	**String** `<name>`
</span>
<span class="tI tI-2">
	Name of the event to emit on.
</span>

<span class="tI tI-1">
	**Object** `<data>` (Optional) (Default: `{}`)
</span>
<span class="tI tI-2">
	Data to emit with the event.  
	You can add any property to this object, but do not overwrite the additional properties added by the event system (`_eventId` and `_object`).
</span>

**Example(s):**

Emit the `hit` event on the `myPlayer` object that passes `damage: 5` on the data object.

```javascript
myPlayer.event.emit("hit", {
	damage: 5
});
```

### Remove By ID

Removes a specific event listener by its unique identity number.

Each event listener has a unique identification number that is passed to the callback function whenever the listener is emitted to in the `_eventId` property.

```javascript
[object].event.removeById(<name>, <id>)
```

<span class="tI tI-1">
	**String** `<name>`
</span>
<span class="tI tI-2">
	Name of the event.
</span>

<span class="tI tI-1">
	**Integer** `<id>`
</span>
<span class="tI tI-2">
	ID number of the listener within the event.
</span>

**Example(s):**

```javascript
myPlayer.event.on("hit", (data) => {
	myPlayer.data.health -= data.damage;

	// Make the player invincible so they can't be hit anymore by removing the event listener
	myPlayer.event.removeById("name", data._eventId);
});
```

### Remove All

Removes all event listeners on a specified event name.

```javascript
[object].event.removeAll(<name>)
```

<span class="tI tI-1">
	**String** `<name>`
</span>
<span class="tI tI-2">
	Name of the event to remove all listeners from.
</span>

**Example(s):**

Remove all listeners listening on the `hit` event on the `myPlayer` object.

```javascript
myPlayer.event.removeAll("hit");
```

# Animation Tweens

Tweens are animation instructions that continually put intermediate frames between two points over a given time.

```javascript
[object].tween

[game].tweenManager
```

```javascript
[game].object.attachSystem([object], {tween: true})
```

# Child Hierarchy

```javascript
[object].child
```

```javascript
[game].object.attachSystem([object], {child: true})
```
