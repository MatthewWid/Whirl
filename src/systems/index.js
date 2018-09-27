// MobSin.systems

// Systems are extra pieces of functionality that extend an objects own functionality
// Eg, attaching the 'event' system to a Sprite will now mean that sprite can emit its own events.
module.exports = {
	child: require("./child"),
	event: require("./event"),
	tween: require("./tween")
};