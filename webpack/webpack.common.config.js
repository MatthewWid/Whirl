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
				use: [
					{
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
					{
						loader: "eslint-loader",
						options: {
							configFile: path.resolve(__dirname, "..", "./.eslintrc.json"),
						},
					},
				],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, ".."),
		filename: "[name].js",
		library: "whirljs",
		libraryTarget: "umd",
		globalObject: "this",
	},
};

module.exports = config;
