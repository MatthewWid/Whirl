// Whirl.Sprite.Circle.render.colour

function renderColour(ctx, sprite) {
	ctx.fillStyle = sprite._fill.data;
	
	ctx.beginPath();
	ctx.arc(sprite._screenBounds.x, sprite._screenBounds.y, sprite._screenBounds.r, 0, Math.PI * 2);
	ctx.fill();
}

module.exports = renderColour;
