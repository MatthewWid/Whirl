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
							plugins: [
								[
									"@babel/plugin-proposal-class-properties",
									{
										loose: true,
									},
								],
								"@babel/plugin-proposal-export-namespace-from",
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
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "..", "./src/"),
		},
	},
	output: {
		path: path.resolve(__dirname, ".."),
		filename: "[name].js",
		library: "Whirl",
		libraryTarget: "umd",
	},
};

module.exports = config;
