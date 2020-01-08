// Preview Changes from Editor
const {default: template} = require("raw-loader!../template.html");

const preview = {};

preview.editor = null;

preview.document = document.getElementById("preview").contentDocument;

preview.template = template;

preview.update = () => {
	console.log("update");
	const {editor} = preview;

	if (!editor) {
		return;
	}

	preview.document.open();

	const content = template
		.replace("{{html}}", editor.html.getValue())
		.replace("{{js}}", editor.js.getValue());
	preview.document.write(content);

	preview.document.close();
};

module.exports = preview;
