// Whirl.input.mouse.eventRegisters.mouseMove

const attemptPreventDefault = require("../../../../lib/attemptPreventDefault.js");
const formatMouseEvt = require("../formatMouseEvt.js");

// Register event listener for mouse moving
const mouseMove = (_game, element, emitter) => {
	let posLast = {
		x: 0,
		y: 0
	};

	element.addEventListener("mousemove", (evt) => {
		attemptPreventDefault(_game, evt);

		const evtInfo = formatMouseEvt(evt);
		evtInfo.posLast = posLast;
		evtInfo.posDiff = {
			x: evtInfo.pos.x - posLast.x,
			y: evtInfo.pos.y - posLast.y
		};
		posLast = {...evtInfo.pos};

		emitter.event.emit("mouseMove", evtInfo);
	});
};

module.exports = mouseMove;
