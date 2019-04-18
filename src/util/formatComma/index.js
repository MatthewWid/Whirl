// Whirl.util.formatComma

module.exports = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
