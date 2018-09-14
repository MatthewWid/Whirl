// MobSin.Sprite.render.colour

function colourRender(_ctx, _sprite) {
	switch (_sprite.bounds.shape) {
		case "rectangle":
			_ctx.fillStyle = _sprite.fill.data;
			_ctx.fillRect(_sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.w, _sprite._physBounds.h);
			break;
	}
}

module.exports = colourRender;