const jsTemplates = {
	"- Choose a Template -": "/* Start from scratch or pick a template. */\n",
	"Simple Setup": require("!!raw-loader?esModule=false!../../scripts/SimpleSetup.js"),
	"Gradients": require("!!raw-loader?esModule=false!../../scripts/GradientAndPointer.js")
};

module.exports = {
	js: jsTemplates,
};
