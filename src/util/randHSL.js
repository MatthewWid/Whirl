/**
 * Generate a random HSL (Hue, Saturation, Lightness) value (`hsl(h, s, l)`).
 *
 * @memberof Whirl.util
 *
 * @param {Object} [cfg] Optional configuration when generating the HSL value.
 * @param {number} [cfg.alpha] Add an alpha value to the generated HSL value (`hsl(h, s, l, a)`).
 * @param {boolean} [cfg.json] Return a JSON object representation of the HSL value instead of a string.
 * @param {number} [cfg.sat] Override the randomly generated *saturation* value.
 * @param {number} [cfg.lit] Override the generated *lightness* value with the given value.
 * @returns {string|Object} Returns an object if *cfg.json* is `true`, otherwise returns a string.
 *
 * @example
 * Whirl.util.randHSL(); // "hsl(39, 3%, 7%)"
 * Whirl.util.randHSL(); // "hsl(48, 85%, 78%)"
 * Whirl.util.randHSL({alpha: true}); // "hsla(85, 15%, 67%, 0.8)"
 * Whirl.util.randHSL({json: true}); // {hue: 177, sat: 20, lit: 27}
 * Whirl.util.randHSL({alpha: true, json: true}); // {hue: 174, sat: 66, lit: 40, a: 0.8}
 * Whirl.util.randHSL({json: true, sat: 80}); // {hue: 169, sat: 80, lit: 60}
 * Whirl.util.randHSL({json: true, lit: 45}); // {hue: 339, sat: 52, lit: 45}
 */
const randHSL = (cfg = {}) => {
	let hue = Math.floor(Math.random() * 360);
	let sat = cfg.sat || Math.floor(Math.random() * 100);
	let lit = cfg.lit || Math.floor(Math.random() * 100);
	let a = cfg.alpha ? Math.round(Math.random() * 10) / 10 : 1;

	if (cfg.json) {
		let ret = {
			hue: hue,
			sat: sat,
			lit: lit,
		};
		if (cfg.alpha) {
			ret.a = a;
		}

		return ret;
	}

	return `hsl${cfg.alpha ? "a" : ""}(${hue}, ${sat}%, ${lit}%${cfg.alpha ? ", " + a : ""})`;
};

module.exports = randHSL;
