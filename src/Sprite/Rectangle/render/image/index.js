// Whirl.Sprite.Rectangle.render.image

function renderImage(ctx, sprite) {
	ctx.drawImage(sprite._fill.data.rawData, sprite._screenBounds.x, sprite._screenBounds.y, sprite._screenBounds.w, sprite._screenBounds.h);
}

module.exports = renderImage;
