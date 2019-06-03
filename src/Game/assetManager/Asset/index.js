// Whirl.game.assetManager.Asset

const imageLoader = require("./imageLoader.js");
const audioLoader = require("./audioLoader.js");

function Asset(_game, name, type, src) {
	_game.object.init(this, "Whirl.Asset", {event: true});
	// Mandatory presets
	this.name = name;
	this.type = type;
	this.src = src;

	this.data._loaded = false;

	// Attach data and properties based on asset type
	switch (this.type) {
		case "image": {
			imageLoader(this);
			break;
		}
		case "audio": {
			audioLoader(this);
			break;
		}
		// json
		// rawtext
	}
}

module.exports = Asset;
