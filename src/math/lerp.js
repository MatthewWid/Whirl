const lerp = (start, end, through) => {
	return (1 - through) * start + through * end;
};

module.exports = lerp;
