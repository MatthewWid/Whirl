// Whirl.input.keyboard.keyCheck.keyIsUp

// Return a boolean whether the given key is up or not
function keyIsUp(_game, key) {
	return _game.input.keysDown[typeof key === "string" ? keys[key] : key] !== true;
}

module.exports = keyIsUp;
