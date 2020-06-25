/**
 * Simple boilerplate to get you up and running to start tinkering.
 * Try and add a Sprite to your game world!
 */

const {
	createGame,
	Base,
	Entity,
	Texture,
	geometry: {Rectangle, Point, Circle, Line},
	mixins: {Mixin, Event, Child},
	math: {random},
} = Whirl.default;

function setup({stage, viewport, game}) {
	const {Viewport, Stage, Container, Sprite, Colour, Gradient} = game;

	// Set up your game with sprites, objects, UI, etc.
}

function update(data) {
	// Run some code on each update loop ...
}

const game = createGame({
	debug: true,
})
	.event.once("didSetup", setup)
	.event.on("didUpdate", update)
	.start();
