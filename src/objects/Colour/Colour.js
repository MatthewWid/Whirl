const Texture = require("../Texture/");

class Colour extends Texture {
	constructor(r, g, b) {
		super();
		
		this._data = `rgb(${r}, ${g}, ${b})`;
	}
}

module.exports = (...args) => new Colour(...args);
module.exports._class = Colour;
