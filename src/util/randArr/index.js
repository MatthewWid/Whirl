// MobSin.util.randArr

/*
	Get a random value from an array 'arr'.
	Eg,
		MobSin.util.randArr([1, 5, 2])
		~> 5

		MobSin.util.randArr([1, 5, 2])
		~> 2
*/
module.exports = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
};