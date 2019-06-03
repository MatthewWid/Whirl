const game = Whirl.Game();

// Create three containers for "dad", "son" and "daughter"
const dad = Whirl.Container(game);
dad.data.name = "dad";

const son = Whirl.Container(game);
son.data.name = "son";

const daughter = Whirl.Container(game);
daughter.data.name = "daughter";

// Create a new container called "dad"
dad
	.child.add([
		// A container "son" is the child of the container "dad"
		son,

		// A container "daughter" is the child of the container "dad"
		daughter
	])
	.child.getAllDeep().forEach((e) => { // Get every child of the "dad" container
		console.log(e._type + " | " + e.data.name); // Log the names of the returned children
	});
