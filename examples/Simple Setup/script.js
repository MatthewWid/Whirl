function update({game, frameCount}) {
	
}

function setup({game, viewport, stage, camera}) {

}

Whirl.Game()
	.setup({
		setup,
		update,

		canvas: "#canvas",
		cW: 400,
		cH: 400
	})
	.start();
