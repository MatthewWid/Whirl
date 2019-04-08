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

# Mathematical Functions

# Easing Functions
