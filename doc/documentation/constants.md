# keys

Maps English keyboard characters to their respective key codes and vice-versa.

Primarily used in keyboard input to write key names instead of key codes.

```javascript
MobSin.keys
```

The keys listed below are in JSON file-format and are also accessed as such.

```json
"a": 65,
"b": 66,
"c": 67,
"d": 68,
"e": 69,
"f": 70,
"g": 71,
"h": 72,
"i": 73,
"j": 74,
"k": 75,
"l": 76,
"m": 77,
"n": 78,
"o": 79,
"p": 80,
"q": 81,
"r": 82,
"s": 83,
"t": 84,
"u": 85,
"v": 86,
"w": 87,
"x": 88,
"y": 89,
"z": 90,

"0": 48,
"1": 49,
"2": 50,
"3": 51,
"4": 52,
"5": 53,
"6": 54,
"7": 55,
"8": 56,
"9": 57,

"ArrowUp": 38,
"ArrowRight": 39,
"ArrowDown": 40,
"ArrowLeft": 37,

"Shift": 16,
"Space": 32,
"Alt": 18,
"Control": 17,
"Minus": 189,
"Equal": 187,
"Backquote": 192,
"Comma": 188,
"Period": 190,
"Slash": 191
```

**Example(s):**

```javascript
MobSin.keys["x"]; // 88

MobSin.keys["ArrowRight"]; // 39

MobSin.keys["Shift"]; // 16
```

Keys can also be searched for in reverse using the `getByKeyCode` method.

**Example(s):**

```javascript
MobSin.keys.getByKeyCode(88); // "x"

MobSin.keys.getByKeyCode(39); // "ArrowRight"

MobSin.keys.getByKeyCode(16); // "Shift"
```

---

# STAGE

Returns the constant string "`_DEFAULTSTAGE`".

Used in [viewport instantiation](../classes/#parameters_6) to automatically set up a default [Stage](../classes#stage) object instead of providing an already created one.

```javascript
MobSin.STAGE
```

The newly instantiated stage will automatically have the same dimensions as the viewport.

---

# CAMERA

Returns the constant string "`_DEFAULTCAMERA`".

Used in [viewport instantiation](../classes/#parameters_6) to automatically set up a default [Camera](../classes#camera) object instead of providing an already created one.

```javascript
MobSin.CAMERA
```

The newly instantiated camera will automatically have the same position and dimensions as the viewport.
