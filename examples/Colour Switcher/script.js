const game = Whirl.Game();
const c = {
	r: 0,
	g: 0,
	b: 0,
	rT: 0,
	gT: 0,
	bT: 0,
	step: 1
};
const debugText = {
	padLeft: 20,
	lineHeight: 10
};
let bg;


// Debug text
game.event.on("didRender", ({game}) => {
	const v = game.viewport("main");

	v.ctx.fillStyle = "rgb(255, 255, 255)";
	v.ctx.fillText("Frame: " + game.frameCount, debugText.padLeft, 40 + debugText.lineHeight);

	const keys = Object.keys(c);
	for (let i = 0; i < keys.length; i++) {
		v.ctx.fillText(keys[i] + ": " + c[keys[i]], debugText.padLeft, 60 + debugText.lineHeight * i);
	}
});

// Set a new target colour
function setNewCol() {
	c.rT = Whirl.math.random(255);
	c.gT = Whirl.math.random(255);
	c.bT = Whirl.math.random(255);
}

// Move the colour towards the target colour,
// when it is reached get a new target colour
function update({game}) {
	c.r = Whirl.math.stepTo(c.r, c.rT, c.step);
	c.g = Whirl.math.stepTo(c.g, c.gT, c.step);
	c.b = Whirl.math.stepTo(c.b, c.bT, c.step);

	game.stage("main").child.getByName("background")[0]
		.setFill(`rgb(${c.r}, ${c.g}, ${c.b})`);

	if (
		Whirl.math.between(c.rT, c.r, c.rT, 3) &&
		Whirl.math.between(c.gT, c.g, c.gT, 3) &&
		Whirl.math.between(c.bT, c.b, c.bT, 3)
	) {
		setNewCol();
	}
}

// Add new 'background' Sprite
function setup({game, viewport, stage, camera}) {
	setNewCol();

	bg = Whirl.Sprite(game, "background", "rgb(0, 0, 0)", {
		w: viewport.bounds.w,
		h: viewport.bounds.h
	});

	stage.child.add(bg);
}

// Setup the game
game.setup({
	update,
	setup,
	canvas: "#canvas",
	cW: 400,
	cH: 400
});
