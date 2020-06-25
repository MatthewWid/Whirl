/**
 * See how to create gradients, player input and some basic angular mathematic functions.
 * 
 * Use the arrow keys to move the player.
 * The center gradient Sprite will look at the player as she moves about.
 * Use WASD to change the dimensions of the center gradient Sprite and see how the Gradient warps.
 * The top left gradient Sprite will spin forever.
 * 
 * Both filled Sprites use the same Gradient texture.
 * Changing the Gradient texture will change how *both* Sprites are rendered!
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

const keys = {};
let sprite1, sprite2, sprite3, gradient;

function setup({stage, viewport, game: {Viewport, Sprite, Colour, Gradient}}) {
	stage.child.add([
		// Spinner
		(sprite1 = Sprite({
			x: 50,
			y: 50,
			anchor: Point(0.5, 0.5),
			fill: (gradient = Gradient({
				start: Point(0, 0),
				end: Point(1, 1),
				stops: [
					[0, Colour(255, 0, 0)],
					[0.5, Colour(0, 0, 255)],
					[1, Colour(0, 255, 0)],
				],
			})),
		})),
		// Looks at Sprite3
		(sprite2 = Sprite({
			x: 200,
			y: 200,
			anchor: Point(0.5, 0.5),
			fill: gradient,
		})),
		// Moveable
		(sprite3 = Sprite({
			x: 300,
			y: 200,
			anchor: Point(0.5, 0.5),
		})),
		// Background
		Sprite({
			w: viewport.bounds.w,
			h: viewport.bounds.h,
			fill: Gradient({
				start: Point(0, 0.5),
				end: Point(1, 0.5),
				stops: [
					[0, Colour(0, 255, 255)],
					[1, Colour(255, 255, 0)],
				],
			}),
			layer: -1,
		}),
	]);
}

function update() {
	// Make Sprite spin
	sprite1.rotation += 1;

	// Keyboard controls
	if (keys.ArrowUp) {
		sprite3.bounds.y -= 5;
	}

	if (keys.ArrowDown) {
		sprite3.bounds.y += 5;
	}

	if (keys.ArrowLeft) {
		sprite3.bounds.x -= 5;
	}

	if (keys.ArrowRight) {
		sprite3.bounds.x += 5;
	}

	if (keys.d) {
		sprite2.bounds.w += 5;
	}

	if (keys.a) {
		sprite2.bounds.w -= 5;
	}

	if (keys.w) {
		sprite2.bounds.h -= 5;
	}

	if (keys.s) {
		sprite2.bounds.h += 5;
	}

	// Make our sprite "look at" the player
	sprite2.rotation = sprite2.derived.bounds.midpoint.angleTo(sprite3.derived.bounds.midpoint);
}

const game = createGame({
	debug: true,
})
	.event.once("didSetup", setup)
	.event.on("didUpdate", update)
	.start();

// Attach event listeners
document.addEventListener("keydown", (evt) => {
	keys[evt.key] = true;
});

document.addEventListener("keyup", (evt) => {
	keys[evt.key] = false;
});
