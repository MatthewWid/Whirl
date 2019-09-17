const formatComma = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

module.exports = formatComma;
