// Imports
const editor = {js: jsEditor} = require("./editor.js");
const preview = require("./preview.js");

preview.editor = editor;

jsEditor.on("change", () => {
	if (editor.config.autorun) {
		clearTimeout(editor.timeout);
		editor.timeout = setTimeout(preview.update, editor.config.delay);
	}
});

preview.update();
