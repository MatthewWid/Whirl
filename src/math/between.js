const between = (val, min, max, leniency = 0) => {
	return (min - leniency) <= val && val < (max + leniency);
};

module.exports = between;
