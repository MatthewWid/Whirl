# In-Built Libraries

Below is documentation for libraries that MobSin provides that aren't necessarily needed when creating a game, but can be convenient when so as to not reinvent the wheel with common operations you may do as part of a game.

Such libraries include general utility functions, mathematical functions and easing functions.

# Utility Functions

Library of general utility functions.

```javascript
MobSin.util.<function>
```

## Format Comma

Format a number to a string separating thousands with commas.

```javascript
MobSin.util.formatComma(<number>)
```

<span class="tI tI-1">
	**Integer** `<number>`
</span>
<span class="tI tI-2">
	Number to be formatted.
</span>

**Example(s):**

```javascript
MobSin.util.formatComma(1); // "1"
MobSin.util.formatComma(1000); // "1,000"
MobSin.util.formatComma(3985721); // "3,985,721"
MobSin.util.formatComma(9874.56); // "9,874.56"
```

## Random Value from Array

Returns a random **value** from a given array.

```javascript
MobSin.util.randArr(<arr>)
```

<span class="tI tI-1">
	**Array** `<arr>`
</span>
<span class="tI tI-2">
	Array to retrieve a random value from.
</span>

**Example(s):**

```javascript
MobSin.util.randArr([1, 5, 2]); // 5
MobSin.util.randArr([1, 5, 2]); // 2
MobSin.util.randArr([3, 8, 9]); // 9
```

## Random HSL

Returns a random HSL (Hue, Saturation, Lightness) value of either a string or JSON object (`hsl(h, s, l)`).

```javascript
MobSin.util.randHSL(<cfg>)
```

<span class="tI tI-1">
	**Object** `<cfg>`
</span>
<span class="tI tI-2">
	Object that provides optional configuration variables when generating the HSL value.
</span>
<span class="tI tI-2">
	`alpha` - If given, the given alpha value will also be given with the generated value (`hsl(h, s, l, a)`).  
	`json` - If `true`, will return a JSON representation of the HSL value instead of a string.  
	`sat` - If given, will override the generated *saturation* value with the given value.  
	`lit` - If given, will override the generated *lightness* value with the given value.
</span>

**Example(s):**

```javascript
MobSin.util.randHSL(); // "hsl(39, 3%, 7%)"
MobSin.util.randHSL(); // "hsl(48, 85%, 78%)"
MobSin.util.randHSL({alpha: true}); // "hsla(85, 15%, 67%, 0.8)"
MobSin.util.randHSL({json: true}); // {hue: 177, sat: 20, lit: 27}
MobSin.util.randHSL({alpha: true, json: true}); // {hue: 174, sat: 66, lit: 40, a: 0.8}
MobSin.util.randHSL({json: true, sat: 80}); // {hue: 169, sat: 80, lit: 60}
MobSin.util.randHSL({json: true, lit: 45}); // {hue: 339, sat: 52, lit: 45}
```

## Random RGB

Returns a random RGB (Red, Green, Blue) value of either a string or JSON object (`rgb(x, y, z)`).

```javascript
MobSin.util.randRGB(<cfg>)
```

<span class="tI tI-1">
	**Object** `<cfg>`
</span>
<span class="tI tI-2">
	Object that provides optional configuration variables when generating the RGB value.
</span>
<span class="tI tI-2">
	`alpha` - If given, the alpha value will also be given with the generated value (`rgb(x, y, z, a)`).  
	`json` - If `true`, will return JSON representation of the RGB value instead of a string.
</span>

**Example(s):**

```javascript
MobSin.util.randRGB(); // "rgb(149, 64, 141)"
MobSin.util.randRGB(); // "rgb(93, 223, 226)"
MobSin.util.randRGB({alpha: true}); // "rgba(78, 159, 140, 0.3)"
MobSin.util.randRGB({json: true}); // {r: 207, g: 70, b: 192}
MobSin.util.randRGB({alpha: true, json: true}); // {r: 66, g: 139, b: 72, a: 0.8}
```

## Shuffle Array

Returns a shuffled *copy* of (not reference to) a given array.  
Does not mutate the original array, but returns a reference to a new shuffled array based on the original given array.

```javascript
MobSin.util.shuffleArr(<arr>)
```

<span class="tI tI-1">
	**Array** `<arr>`
</span>
<span class="tI tI-2">
	Array to be duplicated and shuffled.
</span>

**Example(s):**

```javascript
MobSin.util.shuffleArr([1, 5, 3, 2]); // [2, 5, 3, 1]
MobSin.util.shuffleArr([1, 5, 3, 2]); // [2, 1, 5, 3]
```

# Mathematical Functions

# Easing Functions
