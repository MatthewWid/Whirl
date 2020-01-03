const path = require("path");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
	mode: "development",
	entry: {
		"./examples/_common/styles/css/index": path.resolve(
			__dirname,
			"..",
			"./examples/_common/styles/scss/index.scss"
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
