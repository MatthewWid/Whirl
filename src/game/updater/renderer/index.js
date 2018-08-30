// MobSin.game.renderer

function render() {
	let allViewports = this.viewportManager.getAll();
	for (let i = 0, n = allViewports.length; i < n; i++) {
		let v = allViewports[i];
		v.ctx.fillStyle = v.bg;
		v.ctx.fillRect(v.x, v.y, v.w, v.h);
	}
}

module.exports = render;