const path = require("path");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	mode: "development",
	entry: {
		"./examples/Sandbox/css/template": path.resolve(
			__dirname,
			"..",
			"./examples/Sandbox/scss/template.scss"
		),
		"./examples/Sandbox/css/index": path.resolve(
			__dirname,
			"..",
			"./examples/Sandbox/scss/index.scss"
		),
		"./examples/Sandbox/js/index.bundle": path.resolve(
			__dirname,
			"..",
			"./examples/Sandbox/js/index.js"
		),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, "css-loader?url=false", "sass-loader"],
			},
		],
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	devtool: "source-map",
	stats: "minimal",
	watch: true,
};

module.exports = config;
