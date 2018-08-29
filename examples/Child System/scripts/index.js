document.getElementsByTagName("html")[0].style.backgroundColor = "#FFF";

let ms = MobSin;

let game = new ms.game();

// Create a new container called "dad"
let myCont = new ms.container(game, "dad").child.add([
	// A new container "son" is the child of the container "dad"
	new ms.container(game, "son").child.add(
		new ms.container(game, "dad's grandson")
	),

	// A new container "daughter" is the child of the container "dad"
	new ms.container(game, "daughter")
]).child.getAllDeep().forEach((e) => { // Deep-lookup every child of the container "dad" and run through each returned object
	console.log(e._type + " | " + e.name); // Log out the names of the returned children
});