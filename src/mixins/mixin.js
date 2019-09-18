// Apply mixins to a given object
const mixin = (object) => {
	const {mixins} = object;

	if (
		!mixins ||
		!Array.isArray(mixins) ||
		!mixins.every((m) => typeof m === "object")
	) {
		throw new Error("Whirl | Invalid mixin type and/or format.");
	}

	mixins.forEach((m) => {
		Object.assign(object, m);
	});
};

module.exports = mixin;
