// Preview Changes from Editor
const {default: template} = require("raw-loader!../template.html");

const preview = {};

preview.editor = null;

preview.iframe = document.getElementById("preview");
preview.document = preview.iframe.contentDocument;

preview.template = template;

preview.update = () => {
	const {editor} = preview;

	if (!editor) {
		return;
	}

	preview.document.open();

	let content = template;

	[editor.js, editor.html, editor.css].forEach((e) => {
		// Save editor contents between sessions
		if (editor.config.save) {
			localStorage.setItem(`whirl__sandbox__${e.name}`, e.getValue());
		}

		content = content.replace(`{{${e.name}}}`, e.getValue());
	})

	preview.document.write(content);

	preview.document.close();
};

module.exports = preview;
