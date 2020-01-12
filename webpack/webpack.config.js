const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.config.js");

module.exports = (env = "prod") => {
	const envConfig = require(`./webpack.${env}.config.js`);
	return merge(commonConfig, envConfig);
};
