# In-Built Libraries

Below is documentation for libraries that MobSin provides that aren't necessarily needed when creating a game but can be convenient so as to not reinvent the wheel with common operations you may do as part of a game.

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

Library of mathematical functions.

```javascript
MobSin.math.<function>
```

## Average

Returns the average of the given set of numbers in an array.

```javascript
MobSin.math.average(<arr>)
```

<span class="tI tI-1">
	**Array** `<arr>`
</span>
<span class="tI tI-2">
	Array of numbers to averaged.
</span>

**Example(s):**

```javascript
MobSin.math.average([1, 2, 3]); // 2
MobSin.math.average([1, 2, 3, 4]); // 2.5
MobSin.math.average([8, 3, 9.2, 12, 5.5]); // 7.540000000000001
```

## Between Bounds

Returns `true` if a given value is greater than or equal to a minimum value and less than a maximum value, otherwise returns `false`.  

```javascript
MobSin.math.between(<val>, <min>, <max>, <leniency>)
```

<span class="tI tI-1">
	**Number** `<val>`
</span>
<span class="tI tI-2">
	Value to be checked if it is between the minimum and maximum.
</span>

<span class="tI tI-1">
	**Number** `<min>`
</span>
<span class="tI tI-2">
	Minimum value of the range to be checked.
</span>

<span class="tI tI-1">
	**Number** `<max>`
</span>
<span class="tI tI-2">
	Maximum value of the range to be checked.
</span>

<span class="tI tI-1">
	**Number** `<leniency>` (Optional) (Default: `0`)
</span>
<span class="tI tI-2">
	If given, will still return `true` if the value is outside of the minimum or maximum range but still within the **leniency** value's range from the minimum or maximum value.  
	For example, will still return true if `<val>` is **two (2)**, `<min>` is **four (4)** and `<leniency>` is **three (3)** because **two (2)** (`<val>`) is still at most **three (3)** (`<leniency>`) away from **four (4)** (`<min>`).
</span>

**Example(s):**

```javascript
MobSin.math.between(8, 5, 10); // true
MobSin.math.between(12, 5, 10); // false
MobSin.math.between(12, 5, 10, 4); // true
```

## Clamp

Clamps a given value between a given minimum and maximum value.  
Returns the given value if it is within the range, otherwise returns the minimum or maximum value if the value is lower than or greater than the given range, respectivly.

```javascript
MobSin.math.clamp(<val>, <min>, <max>)
```

<span class="tI tI-1">
	**Number** `<val>`
</span>
<span class="tI tI-2">
	Value to be clamped.
</span>

<span class="tI tI-1">
	**Number** `<min>`
</span>
<span class="tI tI-2">
	Minimum value of the range to be clamped to.
</span>

<span class="tI tI-1">
	**Number** `<max>`
</span>
<span class="tI tI-2">
	Minimum value of the range to be clamped to.
</span>

**Example(s):**

```javascript
MobSin.math.clamp(10, 5, 15); // 10
MobSin.math.clamp(12, 5, 15); // 12
MobSin.math.clamp(3, 5, 15); // 5
MobSin.math.clamp(19, 5, 15); // 15
```

## Linear Interpolation

Interpolate between a given start and end value by a given interpolant value.

```javascript
MobSin.math.lerp(<start>, <end>, <through>)
```

<span class="tI tI-1">
	**Number** `<start>`
</span>
<span class="tI tI-2">
	Start or beginning value.
</span>

<span class="tI tI-1">
	**Number** `<end>`
</span>
<span class="tI tI-2">
	Last or ending value.
</span>

<span class="tI tI-1">
	**Float** `<through>`
</span>
<span class="tI tI-2">
	Value being the interpolant between the start and end values.
</span>

**Example(s):**

```javascript
MobSin.math.lerp(0, 100, 0.1); // 10
MobSin.math.lerp(0, 50, 0.5); // 25
MobSin.math.lerp(50, 0, 0.5); // 25
MobSin.math.lerp(0, 50, 2); // 100
```

## Map Value Between Ranges

Extrapolate how far through a given range of values a given point is to another given range of values.

For example, **five (5)** is **fifty percent (50%)** of the way between **zero (0)** and **ten (10)**. To map the given point linearly between the range zero (0) to ten (10) to the range **fifty (50)** to **one-hundred (100)** would mean going **fifty percent (50%)** of the way between fifty (50) and one-hundred (100) to get **seventy-five (75)**.

```javascript
MobSin.math.map(<value>, <in_min>, <in_max>, <out_min>, <out_max>)
```

<span class="tI tI-1">
	**Number** `<value>`
</span>
<span class="tI tI-2">
	Value to use as a point between the first given range.
</span>

<span class="tI tI-1">
	**Number** `<in_min>`
</span>
<span class="tI tI-2">
	Lower bound of the input range.
</span>

<span class="tI tI-1">
	**Number** `<in_max>`
</span>
<span class="tI tI-2">
	Upper bound of the input range.
</span>

<span class="tI tI-1">
	**Number** `<out_min>`
</span>
<span class="tI tI-2">
	Lower bound of the output range.
</span>

<span class="tI tI-1">
	**Number** `<out_max>`
</span>
<span class="tI tI-2">
	Upper bound of the output range.
</span>

**Example(s):**

```javascript
MobSin.math.map(5, 3, 7, 50, 100); // 75
MobSin.math.map(25, 0, 50, 100, 200); // 150
MobSin.math.map(75, 50, 100, 1000, 2000); // 1500
MobSin.math.map(5, 10, 20, 100, 200); // 50
```

## Random

Returns a random float in the range of zero (0) to one (1) (inclusive of zero (0) but not of one (1)).  
If **one** argument is given then will return an integer in the range of zero (0) up to the given value.  
If **two** arguments are given then will return an integer in the range between the two given arguments.

```javascript
MobSin.math.random(<a>, <b>)
```

<span class="tI tI-1">
	**Number** `<a>` (Optional)
</span>
<span class="tI tI-2">
	If given without `<b>` being given, will be the upper bound of the range of the random number.  
	If given **with** `<b>` being given, will be the lower bound of the range of the random number.
</span>

<span class="tI tI-1">
	**Number** `<b>` (Optional)
</span>
<span class="tI tI-2">
	The upper bound of the range of the random number.
</span>

**Example(s):**

```javascript
MobSin.math.random(); // 0.6019569996537999
MobSin.math.random(); // 0.2947829307200911

MobSin.math.random(5); // 0
MobSin.math.random(5); // 4

MobSin.math.random(5, 10); // 7
MobSin.math.random(5, 10); // 9
```

## Rounding

Rounds a given value to the nearest multiple of a given value.  
If no rounding number is given, will round the value to the nearest integer.

```javascript
MobSin.math.roundTo(<num>, <rounder>)
```

<span class="tI tI-1">
	**Number** `<num>`
</span>
<span class="tI tI-2">
	Number to be rounded.
</span>

<span class="tI tI-1">
	**Integer** `<rounder>` (Optional) (Default: `1`)
</span>
<span class="tI tI-2">
	Multiple to round the `<num>` value to.
</span>

**Example(s):**

```javascript
MobSin.math.roundTo(89, 100); // 100
MobSin.math.roundTo(24, 100); // 0
MobSin.math.roundTo(5, 10); // 10
MobSin.math.roundTo(1729, 200); // 1800
```

## Step Towards

Steps/Increments a given value towards a target value by a given increment.  
If after stepping/incrementing the value it exceeds the target then the target itself will be returned.

```javascript
MobSin.math.stepTo(<val>, <target>, <increment>)
```

<span class="tI tI-1">
	**Number** `<val>`
</span>
<span class="tI tI-2">
	Value to step.
</span>

<span class="tI tI-1">
	**Number** `<target>`
</span>
<span class="tI tI-2">
	Target value to step the given value towards.
</span>

<span class="tI tI-1">
	**Number** `<increment>` (Optional) (Default: `1`)
</span>
<span class="tI tI-2">
	Increment to move the given value by.
</span>

**Example(s):**

```javascript
MobSin.math.stepTo(5, 10); // 6
MobSin.math.stepTo(5, 10, 3); // 8
MobSin.math.stepTo(6, 1, 3); // 3

MobSin.math.stepTo(7, 0, 8); // 0
MobSin.math.stepTo(10, 14, 20); // 14
```

# Easing Functions

Library of easing functions to alter the rate of change of a given value.

| Function | Description |
|-|-|
| Linear | No acceleration. |
| In | Acceleration from zero velocity. |
| Out | Decelerating  to zero velocity. |
| In Out | Acceleration until halfway, then deceleration. |

## Linear

Implies a linear rate of change (`t`).

```javascript
MobSin.easing.linear(<t>)
```
## Quadratic

Implies a rate of change by a degree of two (2) (`t^2`);

```javascript
MobSin.easing.quadratic.in(<t>)

MobSin.easing.quadratic.out(<t>)

MobSin.easing.quadratic.inOut(<t>)
```

## Cubic

Implies a rate of change by a degree of three (3) (`t^3`);

```javascript
MobSin.easing.cubic.in(<t>)

MobSin.easing.cubic.out(<t>)

MobSin.easing.cubic.inOut(<t>)
```
