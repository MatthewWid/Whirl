// MobSin.util.shuffleArr

/*
	Return a shuffled copy of an array 'arr'.
	Eg,
		MobSin.util.shuffleArr([1, 5, 3, 2])
		~> [2, 5, 3, 1]

		MobSin.util.shuffleArr([1, 5, 3, 2])
		~> [2, 1, 5, 3]
*/
module.exports = (arr) => {
	let shuffled = [...arr];
	let counter = shuffled.length;

	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);

		counter--;

		let temp = shuffled[counter];
		shuffled[counter] = shuffled[index];
		shuffled[index] = temp;
	}

	return shuffled;
};