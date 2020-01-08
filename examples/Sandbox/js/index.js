// Imports
const editor = {js: jsEditor, html: htmlEditor} = require("./editor.js");
const preview = require("./preview.js");

// Set desired editor
preview.editor = editor;

// Set default text in editors
htmlEditor.setValue(`<div class="container"></div>\n`);
jsEditor.setValue(`console.clear();\n`);

// Event listeners
[htmlEditor, jsEditor].forEach((e) => {
	e.on("change", () => {
		if (editor.config.autorun) {
			clearTimeout(editor.timeout);
			editor.timeout = setTimeout(preview.update, editor.config.delay);
		}
	});
});

// Title collapse
Array.from(document.getElementsByClassName("editor__title")).forEach((e) => {
	e.addEventListener("click", () => {
		e.parentElement.classList.toggle("editor--collapsed");
	});

	// e.style.backgroundColor = getComputedStyle(document.querySelector(".CodeMirror")).backgroundColor;
});

// Initial update
preview.update();
