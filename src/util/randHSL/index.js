// MobSin.util.randHSL

/*
	Return an HSL string string random values (Eg, hsl(x, y%, z%)).
	If the parameter 'cfg.alpha' is given, an alpha value will be given as well (Eg, hsl(x, y%, z%, f)).
	If the paramater 'cfg.json' is given, a JSON representation of the HSL value will be given, instead of a string.
	If the paramater 'cfg.sat' is given, the saturation of the HSL value will be forced to the given value.
	If the paramater 'cfg.lit' is given, the lightness of the HSL value will be forced to the given value.
	Eg,
		MobSin.util.randHSL()
		~> "hsl(39, 3%, 7%)"

		MobSin.util.randHSL()
		~> "hsl(48, 85%, 78%)"

		MobSin.util.randRGB({alpha: true})
		~> "hsla(85, 15%, 67%, 0.8"

		MobSin.util.randHSL({json: true})
		~> {hue: 177, sat: 20, lit: 27}

		MobSin.util.randHSL({alpha: true, json: true})
		~> {hue: 174, sat: 66, lit: 40, a: 0.8}

		MobSin.util.randHSL({json: true, sat: 80})
		~> {hue: 169, sat: 80, lit: 60}

		MobSin.util.randHSL({json: true, lit: 45})
		~> {hue: 339, sat: 52, lit: 45}
*/
module.exports = (cfg = {}) => {
	let hue = Math.floor(Math.random() * 360);
	let sat = cfg.sat || Math.floor(Math.random() * 100);
	let lit = cfg.lit || Math.floor(Math.random() * 100);
	let a = cfg.alpha ? Math.round(Math.random() * 10) / 10 : 1;

	if (cfg.json) {
		let ret = {
			hue: hue,
			sat: sat,
			lit: lit
		};
		if (cfg.alpha) {
			ret.a = a;
		}

		return ret;
	}

	return `hsl${cfg.alpha ? "a" : ""}(${hue}, ${sat}%, ${lit}%${cfg.alpha ? ", " + a : ""})`;
};