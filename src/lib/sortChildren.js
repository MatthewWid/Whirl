module.exports = (children) => {
	children.sort((curr, next) => {
		if (
			typeof curr.z != "undefined" &&
			typeof next.z != "undefined"
		) {
			return curr.z - next.z;
		} else {
			return 0;
		}
	});

	return children;
};
