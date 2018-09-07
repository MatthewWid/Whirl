// MobSin.game.updater.renderer

function render() {
	this.event.emit("willRender");

	for (let i = 0, n = this.viewports.length; i < n; i++) {
		let viewport = this.viewports[i];

		if (viewport.clear) {
			viewport.ctx.clearRect(
				viewport.bounds.x,
				viewport.bounds.y,
				viewport.bounds.w,
				viewport.bounds.h
			);
		}

		let objectList = viewport.activeStage.child.getAll();
		for (let j = 0, m = objectList.length; j < m; j++) {
			let object = objectList[i];

			if (object.fill.type == "colour") {
				if (object.bounds.shape == "rectangle") {
					viewport.ctx.fillStyle = object.fill.data;
					viewport.ctx.fillRect(object._physBounds.x, object._physBounds.y, object._physBounds.w, object._physBounds.h);
				}
			}
		}
	}

	this.event.emit("didRender");
}

module.exports = render;