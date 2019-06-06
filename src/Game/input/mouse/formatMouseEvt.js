// Whirl.input.mouse.formatMouseEvt

// Format raw mouse event data
const formatMouseEvt = (evt) => ({
	baseElement: evt.currentTarget,
	clickedElement: evt.target,
	// Raw MouseEvent object
	rawEvent: evt,
	// Position relative to the viewport/world
	pos: {
		// TODO: Include viewport and camera offsets in calculation
		x: evt.pageX - evt.currentTarget.offsetLeft,
		y: evt.pageY - evt.currentTarget.offsetTop
	},
	// Position relative to the origin of the page
	page: {
		x: evt.pageX,
		y: evt.pageY
	}
});

module.exports = formatMouseEvt;
