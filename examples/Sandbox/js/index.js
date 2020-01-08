// Imports
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import "style-loader!css-loader!codemirror/lib/codemirror.css";
import "style-loader!css-loader!codemirror/theme/material-palenight.css";
import template from "raw-loader!../template.html";

// Config
const settings = {
	theme: "material-palenight",
	tabSize: 2,
	indentWithTabs: true,
	lineNumbers: true,
	showCursorWhenSelecting: true,
	autofocus: true,
};
const editor = {};
const preview = {};

// HTML
editor.html = "";

// JS
editor.jsinstance = CodeMirror(document.getElementById("editor"), {
	mode: "javascript",
	...settings,
});
editor.js = "";

// Preview
preview.document = document.getElementById("preview").contentDocument;
preview.template = template;
preview.update = () => {
	preview.document.open();

	const content = template
		.replace("{{html}}", editor.html)
		.replace("{{js}}", editor.js);
	preview.document.write(content);

	preview.document.close();
};
console.log(preview);

preview.update();
