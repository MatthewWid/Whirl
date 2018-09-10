// MobSin.game.updater.renderer

function render() {
	this.event.emit("willRender");

	for (let i = 0, n = this.viewports.length; i < n; i++) {
		this.viewports[i]._render();
	}

	this.event.emit("didRender");
}

module.exports = render;