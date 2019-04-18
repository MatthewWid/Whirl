// Whirl.math.between

module.exports = (val, min, max, leniency = 0) => {
	return (min - leniency) <= val && val < (max + leniency);
};
