// Whirl.Sprite.Rectangle.render.colour

function renderColour(ctx, sprite) {
	ctx.fillStyle = sprite._fill.data;
	
	ctx.fillRect(sprite._physBounds.x, sprite._physBounds.y, sprite._physBounds.w, sprite._physBounds.h);
}

module.exports = renderColour;
