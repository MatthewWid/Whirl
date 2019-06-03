// Whirl.Sprite.Circle.render.colour

function render_colour(_ctx, _sprite) {
	_ctx.fillStyle = _sprite._fill.data;
	
	_ctx.beginPath();
	_ctx.arc(_sprite._physBounds.x, _sprite._physBounds.y, _sprite._physBounds.r, 0, Math.PI * 2);
	_ctx.fill();
}

module.exports = render_colour;
