// Whirl.input.keyboard.keyCheck.keyIsDown

// Return a boolean whether the given key is down or not
function keyIsDown(_game, key) {
	return _game.input.keysDown[typeof key === "string" ? keys[key] : key] || false;
}

module.exports = keyIsDown;
