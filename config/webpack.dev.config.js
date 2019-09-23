const path = require("path");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	mode: "development",
	entry: {
		"./build/whirl": path.resolve(__dirname, "..", "./src/Whirl.js"),
		"./examples/_common/styles/css/index": path.resolve(__dirname, "..", "./examples/_common/styles/scss/index.scss")
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
										loose: true
									}
								]
							]
						}
					]
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader?url=false",
					"sass-loader"
				]
			}
		]
	},
	output: {
		path: path.resolve(__dirname, ".."),
		filename: "[name].js"
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		})
	],
	watch: true
};

module.exports = config;
