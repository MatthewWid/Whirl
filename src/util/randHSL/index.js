// MobSin.util.randHSL

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
