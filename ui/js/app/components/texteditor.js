var textEditor = function() {
	var textDiv = $('.text-editor')[0];
	
	var buttons = {
		boldBtn: document.getElementsByClassName('text-action-bold')[0],
		italicBtn: document.getElementsByClassName('text-action-italic')[0],
		underlineBtn: document.getElementsByClassName('text-action-underline')[0]
	}
	
	function createElement(type, attrObj, html){
		var d = document.createElement(type);
		if(attrObj && typeof attrObj === "object"){
			var keys = Object.keys(attrObj);
			for(attr in attrObj){
				d.setAttribute(attr, attrObj[attr]);
			}
			if(html){
				d.innerHTML = html;
			}
		}
		return d;
	}
	function doWithButtons(property, value) {
	    for(var btn in buttons){
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
	    el.className = (el.className === "active")? "":"active";
	}
	textDiv.onfocus = selectButtons;
	textDiv.onblur  = selectButtons;
	textDiv.onkeyup = selectButtons;
	textDiv.onclick = selectButtons;

	doWithButtons("onclick", action);
}