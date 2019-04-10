# Object Systems

Object systems are reusable pieces of code that can be attached to game objects during instantiation (Think React hooks, if you're familiar).

Objects instantiated this way are stored in [the global store](#the-global-store) unless specifically indicated not to be.

You can read more about instantiating your own custom game elements in [the customisation section](../customisation), but for the most part in-built game objects (such as viewports, stages, sprites, plugins, etc.) will instantiate themselves in the game instance for you.

# The Global Store

Most objects instantiated within a MobSin game instance are stored in what is called "The Global Store". This is a persistent list of all objects that exist in the current game instance.

You can see the raw global store of your game instance under `Game.globalStore` but you should **never modify this directly**.

To traverse the global store you should use the provided methods under the `object` property of a game instance:

```javascript
Game.object
```

## Methods

### Get All

Returns an array of every item in the global store.

```javascript
Game.object.getAll()
```

The returned array has no inherent ordering and thus the order the of the returned array will not necessarily be consistent on every call.

### Get By Name

Returns an array of objects in the global store whose `name` property matches the given `<name>` search string.

Viewports, Stages, Sprites and Assets all a have `name` property that you provide when creating a new instance of them. You can search the global for these using the `getByName` method.

```javascript
Game.object.getByName(<name>)
```

<span class="tI tI-1">
	**String** `<name>`
</span>
<span class="tI tI-2">
	Name of an object or objects to search by.
</span>

# Custom Events

```javascript
Object.event
```

# Animation Tweens

```javascript
Object.tween

Game.tweenManager
```

# Child Hierarchy

```javascript
Object.child
```
