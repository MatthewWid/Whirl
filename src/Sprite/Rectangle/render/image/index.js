// Whirl.Sprite.Rectangle.render.image

function render_image(_ctx, _sprite) {
	_ctx.drawImage(_sprite.fill.data.rawData, _sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.w, _sprite._physBounds.h);
}

module.exports = render_image;
