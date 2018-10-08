// MobSin.game.tweenManager.TweenGroup

// A TweenGroup is a list of tweens that are automatically chained together (From start to finish)

// When its 'loop' property is set to true then when the LAST tween in the chain finishes then the first one will start again
// and the chain will continue forever until the 'loop' property is set to false
function TweenGroup(tweens, presets = {}) {
	this.loop = presets.loop || false;

	this.tweens = tweens;

	for (let i = 0; i < this.tweens.length; i++) {
		// If this group will loop do not purge the Tweens because we want to reuse them
		if (this.loop) {
			this.tweens[i].canPurge = false;
		}

		// Chain every this Tween to every one after itself
		if (this.tweens[i + 1]) {
			this.tweens[i].chain(this.tweens[i + 1]);
		}
	}

	if (this.loop) {
		this.tweens[this.tweens.length - 1].event.on("didFinish", (data) => {
			// If this TweenGroup will loop start the first Tween again once the last Tween has finished
			if (this.loop) {
				this.tweens[0].start();
			// If the loop has been turned off after being on
			} else {
				// Remove the event listener and allow the Tweens to be purged
				this.tweens[this.tweens.length - 1].event.removeById("didFinish", data._id);
				for (let i = 0; i < this.tweens.length; i++) {
					this.tweens[i].canPurge = true;
				}
			}
		});
	}
}

module.exports = TweenGroup;