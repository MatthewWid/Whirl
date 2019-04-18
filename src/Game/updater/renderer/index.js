// Whirl.game.updater.renderer

function render() {
	this.event.emit("willRender", {
		game: this
	});

	for (let i = 0, n = this.viewports.length; i < n; i++) {
		this.viewports[i]._render();
	}

	this.event.emit("didRender", {
		game: this
	});
}

module.exports = render;
