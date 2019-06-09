// Whirl.Sprite.Rectangle.resizeToImage

// Resize this Sprite's boundaries to the same dimensions as its fill image
// Optionally modify the resize by a given scale factor but maintain aspect ratio
function resizeToImage(scale = 1) {
	if (this._fill.type === "image") {
		this.bounds.set({
			w: this._fill.data.rawData.width * scale,
			h: this._fill.data.rawData.height * scale
		});
	}

	return this;
};

module.exports = resizeToImage;
