// MobSin.util.randRGB

/*
	Return an RGB string with random values from 0 to 255 (Eg, rgb(x, y, z)).
	If the parameter cfg.alpha is given, an alpha value will be given as well (Eg, rgb(x, y, z, f)).
	If the parameter cfg.json is given, a JSON representation of the RGB value will be given, instead of a string.
	Eg,
		MobSin.util.randRGB()
		~> "rgb(149, 64, 141)"

		MobSin.util.randRGB()
		~> "rgb(93, 226, 226)"

		MobSin.util.randRGB({alpha: true})
		~> "rgba(78, 159, 140, 0.3)"

		MobSin.util.randRGB({json: true})
		~> {r: 207, g: 70, b: 192}

		MobSin.util.randRGB({alpha: true, json: true})
		~> {r: 66, g: 139, b: 72, a: 0.8}
*/
module.exports = (cfg = {}) => {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random()*256);
	let b = Math.floor(Math.random()*256);
	let a = cfg.alpha ? Math.round(Math.random() * 10) / 10 : 1;

	if (cfg.json) {
		let ret = {
			r: r,
			g: g,
			b: b
		};
		if (cfg.alpha) {
			ret.a = a;
		}

		return ret;
	}

	return `rgb${cfg.alpha ? "a" : ""}(${r}, ${g}, ${b}${cfg.alpha ? ", " + a : ""})`;
};