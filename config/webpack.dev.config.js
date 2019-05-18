const path = require("path");

const config = {
	mode: "development",
	entry: {
		whirl: path.resolve(__dirname, "..", "./src/Whirl.js")
	},
	output: {
		path: path.resolve(__dirname, "..", "./build"),
		filename: "[name].js"
	},
	watch: true
};

module.exports = config;
