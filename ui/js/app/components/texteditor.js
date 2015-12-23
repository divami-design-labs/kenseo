'use strict';

var textEditor = function textEditor(textDivSection) {
	var buttons = {
		boldBtn: textDivSection.querySelector('[name="text-b"]'),
		italicBtn: textDivSection.querySelector('[name="text-i"]'),
		underlineBtn: textDivSection.querySelector('[name="text-u"]')
	},
	    textDiv = textDivSection.querySelector('.text-editor');

	function doWithButtons(property, value) {
		for (var btn in buttons) {
			buttons[btn][property] = value;
		}
	}

	function selectButtons(e) {
		var sel = window.getSelection();
		if (sel.baseNode && (sel.baseNode === textDiv || sel.baseNode.ownerDocument.activeElement === textDiv)) {
			doWithButtons("className", "");
			var p = sel.baseNode.parentElement;
			while (!/(div|body|button)/i.test(p.tagName.toLowerCase())) {
				var btn = document.getElementsByName("text-" + p.tagName.toLowerCase())[0];
				btn.className = "active";
				p = p.parentElement;
			}
		} else {
			doWithButtons("className", "");
		}
	}

	function action(e) {
		var el = e.currentTarget;
		document.execCommand(el.getAttribute('text-name'));
		el.className = el.className === "active" ? "" : "active";
		textDiv.focus();
	}
	// textDiv.onfocus = selectButtons;
	textDiv.onblur = selectButtons;
	textDiv.onkeyup = selectButtons;
	textDiv.onclick = selectButtons;

	doWithButtons("onclick", action);
};
//# sourceMappingURL=texteditor.js.map
