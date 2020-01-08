// Code Editor

const CodeMirror = require("codemirror");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/javascript/javascript.js");
require("style-loader!css-loader!codemirror/lib/codemirror.css");
require("style-loader!css-loader!codemirror/theme/material-palenight.css");

const editor = {};

// Configuration
editor.config = {
	delay: 500,
	autorun: true,
	save: true,
};

// Timeout for auto-updating preview
editor.timeout = null;

// CodeMirror Default Settings
editor.cmSettings = {
	theme: "material-palenight",
	tabSize: 2,
	indentWithTabs: true,
	lineNumbers: true,
	showCursorWhenSelecting: true,
};

// HTML Editor
editor.html = CodeMirror(document.getElementById("editor-html"), {
	mode: "htmlmixed",
	...editor.cmSettings,
});
editor.html.name = "html";
editor.html.templateSelector = null;
editor.html.default = "<div class=\"container\"></div>\n";

// JS Editor
editor.js = CodeMirror(document.getElementById("editor-js"), {
	mode: "javascript",
	autofocus: true,
	...editor.cmSettings,
});
editor.js.name = "js";
editor.js.templateSelector = document.getElementById("editor-js-templates");
editor.js.default = "\n";

module.exports = editor;
