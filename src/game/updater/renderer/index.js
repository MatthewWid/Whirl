// MobSin.game.updater.renderer

function render() {
	this.event.emit("willRender");

	let allViewports = this.viewportManager.getAll();
	for (let i = 0, n = allViewports.length; i < n; i++) {
		allViewports[i].render();
	}

	this.event.emit("didRender");
}

module.exports = render;