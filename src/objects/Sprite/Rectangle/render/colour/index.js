// Whirl.Sprite.Rectangle.render.colour

function renderColour(ctx, sprite) {
	ctx.fillStyle = sprite._fill.data;
	
	ctx.fillRect(sprite._screenBounds.x, sprite._screenBounds.y, sprite._screenBounds.w, sprite._screenBounds.h);
}

module.exports = renderColour;
