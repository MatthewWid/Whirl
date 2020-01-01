/**
 * Simple boilerplate to get you up and tinkering.
 * Start off by adding a coloured Sprite to your world.
 */

const {
	Game,
	geometry: {Rectangle, Point, Circle, Line},
	math: {random}
} = Whirl;

function setup({stage, viewport, game}) {
	const {Viewport, Stage, Container, Sprite, Colour} = game;

	//
}

function update(data) {
	//
}

const game = Game({
	debug: true,
	root: ".container",
})
	.event.once("didSetup", setup)
	.event.on("didUpdate", update)
	.start();
