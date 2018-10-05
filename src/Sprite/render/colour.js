// MobSin.Sprite.render.colour

function colourRender(_ctx, _sprite) {
	_ctx.fillStyle = _sprite.fill.data;

	switch (_sprite.bounds._shape) {
		case "rectangle":
			_ctx.fillRect(_sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.w, _sprite._physBounds.h);
			break;
		case "circle":
			_ctx.beginPath();
			_ctx.arc(_sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.r, 0, Math.PI * 2);
			_ctx.fill();
			break;
	}
}

module.exports = colourRender;