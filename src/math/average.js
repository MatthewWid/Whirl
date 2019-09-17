const average = (arr) => {
	let sum = 0;
	for (let i = 0, n = arr.length; i < n; i++) {
		sum += arr[i];
	}
	return sum / arr.length;
};

module.exports = average;
