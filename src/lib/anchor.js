/*
	Anchor/Origin point controller for game objects.
*/

function anchorFactory(_obj, presets = {}) {
	const anchor = {
		x: presets.x || 0,
		y: presets.y || 0
	};

	anchor.center = (function() {
		this.x = this.y = .5;

		return _obj;
	}).bind(anchor);

	return anchor;
}

module.exports = anchorFactory;
