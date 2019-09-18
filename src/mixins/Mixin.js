class Mixin {
	_namespace = null;

	static apply(object) {
		const {mixins} = object;

		if (
			!mixins ||
			!Array.isArray(mixins) ||
			!mixins.every((m) => m.prototype instanceof Mixin)
		) {
			throw new Error("Whirl | Invalid mixin type and/or format.");
		}

		mixins.forEach((mixinClass) => {
			// Create instance of mixin
			const mixin = new mixinClass();

			// Enforce namespace
			if (!mixin._namespace) {
				throw new Error(`Whirl | Mixin "${mixinClass.name}" has no namespace.`);
			}

			// Add mixin instance to object as property under namespace
			object[mixin._namespace] = mixin;

			// Remove unused '_namespace' property
			delete object[mixin._namespace]._namespace;
		});

		// Remove unused 'mixins' property
		delete object.mixins;
	}
}

module.exports = Mixin;
