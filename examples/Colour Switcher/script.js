document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let wh = Whirl;

let game = wh.Game();

let v = game.viewportManager.add("vp", "#canvas", wh.STAGE, wh.CAMERA, {
	cW: 400,
	cH: 400
});
v.activeStage.child.add(
	wh.Sprite(game, "background", "rgb(0, 0, 0)", {
		w: 400,
		h: 400
	})
);

game.event.on("didUpdate", (data) => {
	c.r = wh.math.stepTo(c.r, c.rT, c.step);
	c.g = wh.math.stepTo(c.g, c.gT, c.step);
	c.b = wh.math.stepTo(c.b, c.bT, c.step);

	if (
		wh.math.between(c.rT, c.r, c.rT, 3) &&
		wh.math.between(c.gT, c.g, c.gT, 3) &&
		wh.math.between(c.bT, c.b, c.bT, 3)
	) {
		setNewCol();
	}
});

game.event.on("willRender", () => {
	v.activeStage.child.getByName("background")[0].setFill(`rgb(${c.r}, ${c.g}, ${c.b})`);
});

// Set a new target colour
function setNewCol() {
	c.rT = wh.math.random(255);
	c.gT = wh.math.random(255);
	c.bT = wh.math.random(255);
}

let c = {
	r: 0,
	g: 0,
	b: 0,
	rT: 0,
	gT: 0,
	bT: 0,
	step: 1
};
setNewCol();

let debugText = {
	padLeft: 20,
	lineHeight: 10
}

game.event.on("didRender", () => {
	v.ctx.fillStyle = "rgb(255, 255, 255)";
	v.ctx.fillText("Frame: " + game.frameCount, debugText.padLeft, 40 + debugText.lineHeight);

	let keys = Object.keys(c);
	for (let i = 0; i < keys.length; i++) {
		v.ctx.fillText(keys[i] + ": " + c[keys[i]], debugText.padLeft, 60 + debugText.lineHeight * i);
	}
});

game.start();
