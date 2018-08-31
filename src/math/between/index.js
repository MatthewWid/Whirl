// MobSin.math.between

/*
	Check if a value 'val' is between two values 'min' and 'max'
	With an optional leniency to 'min' and 'max' that still returns true if outside 'max' or 'min' but still within the 'leniency' range
	Eg,
		MobSin.math.between(0, 5, 10)
		> true

		MobSin.math.between(0, 11, 10)
		> false

		MobSin.math.between(0, 11, 10, 2)
		> true
*/
module.exports = (val, min, max, leniency = 0) => {
	return (min - leniency) < val && val < (max + leniency);
}