// Preview Changes from Editor
const {default: template} = require("raw-loader!../template.html");

const preview = {};

preview.editor = null;

preview.template = template;

preview.update = () => {
	const {editor} = preview;

	if (!editor) {
		return;
	}

	let parent;

	// Remove IFrame
	if (preview.iframe) {
		parent = preview.iframe.parentNode;

		preview.iframe.remove();
	} else {
		parent = document.querySelector(".preview-container");
	}

	// Create new IFrame
	const iframe = document.createElement("iframe");
	iframe.setAttribute("id", "preview");
	parent.appendChild(iframe);

	// Store IFrame
	preview.iframe = iframe;
	preview.document = iframe.contentDocument;

	// Populate IFrame
	preview.document.open();

	let content = template;

	[editor.js, editor.html, editor.css].forEach((e) => {
		// Save editor contents between sessions
		if (editor.config.save) {
			localStorage.setItem(`whirl__sandbox__${e.name}`, e.getValue());
		}

		content = content.replace(`{{${e.name}}}`, e.getValue());
	});

	preview.document.write(content);

	preview.document.close();
};

module.exports = preview;
