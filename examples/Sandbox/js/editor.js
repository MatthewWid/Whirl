// Code Editor

const CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("codemirror/mode/css/css.js");
require("style-loader!css-loader!codemirror/lib/codemirror.css");
require("style-loader!css-loader!codemirror/theme/material-palenight.css");
const {js: jsTemplates} = require("./templates.js");

const editor = {};

// Configuration
editor.config = {
	delay: 600,
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

// JS Editor
editor.js = CodeMirror(document.getElementById("editor-js"), {
	mode: "javascript",
	autofocus: true,
	...editor.cmSettings,
});
editor.js.name = "js";
editor.js.templateSelector = document.getElementById("editor-js-templates");
editor.js.default = jsTemplates["Simple Setup"];

// HTML Editor
editor.html = CodeMirror(document.getElementById("editor-html"), {
	mode: "htmlmixed",
	...editor.cmSettings,
});
editor.html.name = "html";
editor.html.templateSelector = null;
editor.html.default = "<!-- Custom canvasses, assets and imports. -->\n";

// HTML Editor
editor.css = CodeMirror(document.getElementById("editor-css"), {
	mode: "css",
	...editor.cmSettings,
});
editor.css.name = "css";
editor.css.templateSelector = null;
editor.css.default = "/* Custom style rules you may need. */\n";

module.exports = editor;
