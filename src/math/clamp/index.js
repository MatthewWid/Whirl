// MobSin.math.clamp

/*
	Clamp a value 'val' between values 'min' and 'max'
	Either returns 'val' if it is between them or returns 'min' or 'max' if 'val' is higher than or lower than the given range respectively
*/
module.exports = (val, min, max) => {
	return Math.min(max, Math.max(min, val));
};