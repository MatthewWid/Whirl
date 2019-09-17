const randRGB = (cfg = {}) => {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
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

module.exports = randRGB;
