document.getElementsByTagName("html")[0].style.backgroundColor = "#EEE";

let ms = MobSin;

let game = new ms.game();

let player;
game.assetManager.add({
	name: "playerPic",
	type: "image",
	src: "./img/playerSprite.png"
}).event.on("didLoad", (data) => {
	player = new ms.Sprite(game, "player", data.asset, {
		x: 50,
		y: 150,
		w: 50,
		h: 50
	});

	myStage.child.add(player);
});

let bouncyBlock = new ms.Sprite(game, "bouncyBlock", ms.util.randRGB(), {
	x: 50,
	y: 50,
	w: 50,
	h: 50
});

let myStage = game.stageManager.add("world", {
	x: 0,
	y: 0,
	w: 400,
	h: 400
}).child.add(
	bouncyBlock
);

let myViewport = game.viewportManager.add("vp", "#canvas", myStage, ms.CAMERA, {
	cW: 400,
	cH: 400
});

let speed = 3;

game.event.on("didUpdate", () => {
	bouncyBlock.bounds.x += speed;

	if (bouncyBlock.bounds.x + bouncyBlock.bounds.w >= myViewport.bounds.w) {
		bouncyBlock.setFill(MobSin.util.randRGB());
		speed = -speed;
	}
	if (bouncyBlock.bounds.x <= 0) {
		bouncyBlock.setFill(MobSin.util.randRGB());
		speed = -speed;
	}
});

console.log(myStage, myViewport, bouncyBlock);

game.start();