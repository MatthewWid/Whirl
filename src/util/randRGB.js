/**
 * Generate a random RGB (Red, Green, Blue) value (`rgb(x, y, z)`).
 *
 * @memberof Whirl.util
 *
 * @param {Object} [cfg] Optional configuration when generating the RGB value.
 * @param {number} [cfg.alpha] Add an alpha value to the generated RGB value (`rgb(r, g, b, a)`).
 * @param {boolean} [cfg.json] Return a JSON object representation of the RGB value instead of a string.
 * @returns {string|Object} Returns an object if *cfg.json* is `true`, otherwise returns a string.
 *
 * @example
 * Whirl.util.randRGB(); // "rgb(149, 64, 141)"
 * Whirl.util.randRGB(); // "rgb(93, 223, 226)"
 * Whirl.util.randRGB({alpha: true}); // "rgba(78, 159, 140, 0.3)"
 * Whirl.util.randRGB({json: true}); // {r: 207, g: 70, b: 192}
 * Whirl.util.randRGB({alpha: true, json: true}); // {r: 66, g: 139, b: 72, a: 0.8}
 */
const randRGB = (cfg = {}) => {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	let a = cfg.alpha ? Math.round(Math.random() * 10) / 10 : 1;

	if (cfg.json) {
		let ret = {
			r: r,
			g: g,
			b: b,
		};
		if (cfg.alpha) {
			ret.a = a;
		}

		return ret;
	}

	return `rgb${cfg.alpha ? "a" : ""}(${r}, ${g}, ${b}${cfg.alpha ? ", " + a : ""})`;
};

module.exports = randRGB;
