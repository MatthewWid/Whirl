document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let ms = MobSin;

let game = new ms.game();

let myVp = game.viewportManager.add("vp", "#canvas", undefined, {
	cW: 800,
	cH: 600,
	bg: "rgb(255, 0, 0)"
});

function setNewCol() {
	c.rT = Math.floor(Math.random() * 255);
	c.gT = Math.floor(Math.random() * 255);
	c.bT = Math.floor(Math.random() * 255);
}

let c = {
	r: 0,
	g: 0,
	b: 0,
	rT: 0,
	gT: 0,
	bT: 0,
	step: .1
};
setNewCol();

let v = game.viewportManager.get("vp");

game.event.on("didUpdate", (data) => {

	c.r = ms.math.lerp(c.r, c.rT, c.step);
	c.g = ms.math.lerp(c.g, c.gT, c.step);
	c.b = ms.math.lerp(c.b, c.bT, c.step);

	if (
		ms.math.between(c.rT - 1, c.r, c.rT + 1) &&
		ms.math.between(c.gT - 1, c.g, c.gT + 1) &&
		ms.math.between(c.bT - 1, c.b, c.bT + 1)
	) {
		setNewCol();
	}
});

game.event.on("willRender", () => {
	v.bg = `rgb(${c.r}, ${c.g}, ${c.b})`;
});

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