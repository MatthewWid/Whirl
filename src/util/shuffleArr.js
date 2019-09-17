const shuffleArr = (arr) => {
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

module.exports = shuffleArr;
