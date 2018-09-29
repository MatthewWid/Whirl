document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = ms.Game();

// Create three containers for "dad", "son" and "daughter"
let dad = ms.Container(game);
dad.data.name = "dad";

let son = ms.Container(game);
son.data.name = "son";

let daughter = ms.Container(game);
daughter.data.name = "daughter";

// Create a new container called "dad"
dad
	.child.add([
		// A container "son" is the child of the container "dad"
		son,

		// A container "daughter" is the child of the container "dad"
		daughter
	])
	.child.getAllDeep().forEach((e) => { // Deep-lookup every child of the container "dad" and run through each returned object
		console.log(e._type + " | " + e.data.name); // Log the names of the returned children
	});