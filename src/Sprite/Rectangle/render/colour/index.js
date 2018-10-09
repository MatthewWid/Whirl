// MobSin.Sprite.Rectangle.render.colour

function render_colour(_ctx, _sprite) {
	_ctx.fillStyle = _sprite.fill.data;
	
	_ctx.fillRect(_sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.w, _sprite._physBounds.h);
}

module.exports = render_colour;