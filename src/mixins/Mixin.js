class Mixin {
	static _namespace = null;

	static apply(object) {
		const {mixins} = object;

		if (
			!mixins ||
			!Array.isArray(mixins) ||
			!mixins.every((m) => m.prototype instanceof Mixin)
		) {
			throw new Error("Whirl | Invalid mixin type and/or format.");
		}

		mixins.forEach((mixin) => {
			// Enforce namespace
			if (!mixin._namespace) {
				throw new Error(`Whirl | Mixin "${mixin.name}" has no namespace.`);
			}

			// Create and add mixin instance to object as property under namespace
			object[mixin._namespace] = new mixin();
		});

		// Remove unused 'mixins' property
		delete object.mixins;
	}
}

module.exports = Mixin;
