// Whirl.Sprite.Circle.render.colour

function renderColour(ctx, sprite) {
	ctx.fillStyle = sprite._fill.data;
	
	ctx.beginPath();
	ctx.arc(sprite._physBounds.x, sprite._physBounds.y, sprite._physBounds.r, 0, Math.PI * 2);
	ctx.fill();
}

module.exports = renderColour;
