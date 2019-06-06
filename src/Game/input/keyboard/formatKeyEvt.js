// Whirl.input.keyboard.formatMouseEvt

const keys = require("../../../keys");

const formatKeyEvt = (evt) => ({
	baseElement: evt.currentTarget,
	rawEvent: evt,
	keyCode: evt.keyCode,
	keyName: keys.getByKeyCode(evt.keyCode)
});

module.exports = formatKeyEvt;
