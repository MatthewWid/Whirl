const {js: jsTemplates} = require("./templates.js");
const editor = {js: jsEditor, html: htmlEditor} = require("./editor.js");
const preview = require("./preview.js");

// Desired Editor
preview.editor = editor;

[htmlEditor, jsEditor].forEach((e) => {
	// Event Listeners
	e.on("change", () => {
		if (editor.config.autorun) {
			clearTimeout(editor.timeout);
			editor.timeout = setTimeout(preview.update, editor.config.delay);
		}
	});

	// Load default content, either from local storage or the editor default value
	if (editor.config.save) {
		e.setValue(localStorage.getItem(`whirl__sandbox__${e.name}`) || e.default);
	} else {
		e.setValue(e.default);
	}
});

// Template Selector
Object.keys(jsTemplates).forEach((e, i) => {
	const option = document.createElement("option");
	option.value = e;
	option.innerText = e;

	jsEditor.templateSelector.appendChild(option);
});
jsEditor.templateSelector.addEventListener("change", () => {
	if (jsEditor.templateSelector.value) {
		jsEditor.setValue(jsTemplates[jsEditor.templateSelector.value]);
	} else {
		jsEditor.setValue("\n");
	}
});

// Title Collapse
Array.from(document.getElementsByClassName("editor__title")).forEach((e) => {
	e.addEventListener("click", () => {
		e.parentElement.classList.toggle("editor--collapsed");
	});

	// e.style.backgroundColor = getComputedStyle(document.querySelector(".CodeMirror")).backgroundColor;
});
