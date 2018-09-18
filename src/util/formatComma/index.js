// MobSin.util.formatComma

/*
	Format a number to a string with commas for thousands.
	Eg,
		MobSin.util.formatComma(3985721)
		> "3,985,721"
*/
module.exports = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};