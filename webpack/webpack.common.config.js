const path = require("path");

const config = {
	mode: "development",
	entry: {
		"./build/whirl": path.resolve(__dirname, "..", "./src/Whirl.js"),
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: [
						{
							plugins: [
								[
									"@babel/plugin-proposal-class-properties",
									{
										loose: true,
									},
								],
							],
						},
					],
				},
			},
		],
	},
	output: {
		path: path.resolve(__dirname, ".."),
		filename: "[name].js",
	},
};

module.exports = config;
