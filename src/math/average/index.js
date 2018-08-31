// MobSin.math.average

/*
	Return the average of an array 'arr' of values
	Eg,
		MobSin.math.average([1, 2, 3])
		> 2

		MobSin.math.average([1, 2, 3, 4])
		> 2.5
*/
module.exports = (arr) => {
	let sum = 0;
	for (let i = 0, n = arr.length; i < n; i++) {
		sum += arr[i];
	}
	return sum / arr.length;
};