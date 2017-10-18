var game = new MobSin_Engine();
game.setStage("#canvas", 480, 320);

var block1 = new game.objects.block({
	x: 40,
	y: 40,
	w: 40,
	h: 40,
	colour: "#F00",
	data: {
		name: "Block 1"
	}
});
block1.instance("workspace");

var block2 = new game.objects.block({
	x: 90,
	y: 40,
	w: 40,
	h: 40,
	colour: "#00F",
	data: {
		name: "Block 2"
	}
});
block2.instance("workspace");

var text1 = new game.objects.textScreen({
	x: 40,
	y: 370,
	colour: "#F00",
	text: "Welcome to MobSin",
	size: 50,
	font: "Impact"
});
text1.instance();
game.anim.transitionLinear(text1, "y", 10, text1.y, 160, function() {
	text1.colour = "#0A0";
});
/*
text1.update = function() {
	if (this.y > 160) {
		this.y -= 2;
	}
};
*/
/*
game.func.waitC(4, function() {
	text1.text = "A great game engine!";
	text1.size = "45";

	game.func.waitC(2, function() {
		game.func.destroy(text1);
	});
});
*/
game.anim.transitionLinear(block1, "x", 10, block1.x, block1.x + 200);

game.anim.transitionLinear(game.camera, "y", 10, -100, 400, function() {
	console.log("Over");

	game.func.waitC(2, function() {
		console.log("Removing");
		game.func.destroy(text1);

		var text2 = new game.objects.textScreen({
			x: 120,
			y: 150,
			text: "Enjoy",
			size: 100,
			font: "Arial"
		});
		text2.instance();
		var block3 = new game.objects.block({
			x: 120,
			y: 155,
			w: 240,
			h: 5,
			colour: "#00F"
		});
		block3.instance("hud");
		function randomCrosshairLoop(obj) {
			game.func.waitC(1, function() {
				obj.colour = "#"+((1<<24)*Math.random()|0).toString(16);
				randomCrosshairLoop(obj)
			});
		}
		randomCrosshairLoop(block3)
	});
});

game.start();