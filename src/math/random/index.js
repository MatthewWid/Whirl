// MobSin.math.random

/*
	If values 'a' and 'b' are given, return an integer between 'a' and 'b' (Including 'a' but not 'b')
	If only a value 'a' is given, return an integer between 0 and 'a'  (Including 0 but not 'a')
	Eg,
		MobSin.math.random(10, 20)
		~> 14

		MobSin.math.random(5)
		~> 3
*/
module.exports = (a, b) => {
	if (b) {
		return Math.floor(Math.random() * (a - b) + b);
	} else {
		return Math.floor(Math.random() * a);
	}
};