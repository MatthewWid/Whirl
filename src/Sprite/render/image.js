// MobSin.Sprite.render.image

function imageRender(_ctx, _sprite) {
	_ctx.drawImage(_sprite.fill.data.rawData, _sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.w, _sprite._physBounds.h);
}

module.exports = imageRender;