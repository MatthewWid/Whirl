// Whirl.Sprite.Rectangle.render.image

function renderImage(ctx, sprite) {
	ctx.drawImage(sprite._fill.data.rawData, sprite._physBounds.x, sprite._physBounds.y, sprite._physBounds.w, sprite._physBounds.h);
}

module.exports = renderImage;
