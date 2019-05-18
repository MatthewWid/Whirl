const path = require("path");

const config = {
	mode: "production",
	entry: {
		whirl: path.resolve(__dirname, "..", "./src/Whirl.js")
	},
	output: {
		path: path.resolve(__dirname, "..", "./build"),
		filename: "[name].js"
	}
};

module.exports = config;
