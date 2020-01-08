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

// JS Editor
editor.js = CodeMirror(document.getElementById("editor-js"), {
	mode: "javascript",
	autofocus: true,
	...editor.cmSettings,
});

module.exports = editor;
