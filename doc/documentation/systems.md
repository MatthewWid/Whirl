# Object Systems

Object systems are reusable pieces of code that can be attached to game objects during instantiation (Think React hooks, if you're familiar).

Objects instantiated this way are stored in [the global store](#the-global-store) unless specifically ordered not to be.

You can read more about instantiating your own custom game elements in [the customisation section](../customisation), but for the most part in-built game objects (such as viewports, stages, sprites, plugins, etc.) will instantiate themselves in the game instance for you.

# The Global Store

Most objects instantiated within a MobSin game instance are stored in what is called "The Global Store". This is a persistent list of all objects that exist in the current game instance.

You can see the raw global store of your game instance under `Game.globalStore` but you should **never modify this directly**. You should also never rely on the order of the array representing the raw global store as it can change between game updates, object modification and other various ways.

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

All objects instantiated under a game instance give a name for their "type" that identifies where the object came from and its own class. For example, a viewport's `_type` is `MobSin.Viewport`, and a sprite's `_type` is `MobSin.Sprite`.

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

```javascript
[object].event
```

# Animation Tweens

```javascript
[object].tween

[game].tweenManager
```

# Child Hierarchy

```javascript
[object].child
```
