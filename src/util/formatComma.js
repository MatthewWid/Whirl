/**
 * Format a number to a string separating thousands with commas.
 *
 * @memberof Whirl.util
 *
 * @param {number|string} val Number to be formatted.
 * @returns {string} Formatted number with commas separating groups of thousands.
 *
 * @example
 * Whirl.util.formatComma(1); // "1"
 * Whirl.util.formatComma("1000"); // "1,000"
 * Whirl.util.formatComma(3985721); // "3,985,721"
 * Whirl.util.formatComma(9874.56); // "9,874.56"
 */
const formatComma = (val) => {
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default formatComma;
