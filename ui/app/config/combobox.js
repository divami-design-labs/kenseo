/**
  * This is a Type-ahead Hierarchical combo tree component
  * @author Venkateshwar
  */
var comboBox = function(elem, suggestions, values) {
	var _this = this;
	var code = {up: 38, down: 40,enter: 13},
		$elem = $(elem);

		values = values || {},
		values.container = values.container || "comboTree",
		values.suggestionsContainer = values.suggestionsContainer || "suggestionsContainer",
		values.hoveredElement = values.hoveredElement || "active",
		values.collapseArrow = values.collapseArrow || "collapseArrow",
		values.expandArrow = values.expandArrow || "expandArrow",
		values.listClass = values.listClass || "selectable",
		values.noChild = "noChild",
		values.placeholder = values.placeholder || "",
		dot = ".",
		suggestionsContainerClass = dot + values.suggestionsContainer;

	$elem.addClass(values.container);

	_this.$elem = $elem;
	// var textBox = document.createElement('input');
	// textBox.setAttribute('type', 'text');
	renderSuggestions(elem, suggestions);
	// if(values.disabled){
	// 	textBox.setAttribute('disabled', true);
	// }

	// <--  Hide section -->
	//events
	// This section is to make sure that when the user clicks on outside of the suggestions box
	// The suggestion box will hide.
	document.onclick = function(){
		hideSuggestions(true);
	}
	$elem.click(function(e){
		e.stopPropagation();
	});
	// <-- End of Hide section -->

	/**
	 * It is used to show or hide the child items. 'excludeChildren' flag is used to show or hide the child items
	 * @constructor
	 * @param {object} e - represents the event or jquery element object.
	 */
	function toggleChildItems(e){
		var el = $(e.currentTarget);

		if(el.hasClass(values.collapseArrow)){
			collapseItems(el);
		}
		else if(el.hasClass(values.expandArrow)){
			expandItems(el);
		}
		$elem.find('input').focus();
	}

	/**
	 * It is used to hide the child items Makes the flag, 'excludeChildren' true. To hide the child items and then renders the new list again
	 * @constructor
	 * @param: {object} el - Holds the clicked parent list item
	 */
	function collapseItems(el){
		var refId = el.parent().data('id');
		for(var i = 0; i< suggestions.length; i++){
			var p = suggestions[i];
			if(refId === p.id){
				p.excludeChildren = true;
			}
		}
		renderSuggestions(elem, suggestions);
	}

	/**
	 * It is used to show the child items Makes the flag, 'excludeChildren' false. To show the child items and then renders the new list again
	 * @param {object} el - Holds the clicked parent list item
	 */
	function expandItems(el){
		var refId = el.parent().data('id');
		var blnAccess = false;
		for(var i = 0; i< suggestions.length; i++){
			var p = suggestions[i];
			if(refId === p.id){
				blnAccess = true;
				p.excludeChildren = false;
			}
		}
		if(blnAccess){
			renderSuggestions(elem, suggestions);
		}
	}

	/**
	 * Inserts the clicked list item's data in to the textbox. Here the code checks whether the clicked list item is parent item or parent item with no children or child item.
	 * @constructor
	 * @param {object} e - could be the event or the jquery dom element object itself.
	 */
	function insertData(e){
		var $el = $(e.currentTarget || e);
		var $text = $elem.find('input');
		var html = $el.html();
		// Trigger change event
		if($text.val().toLowerCase() !== html.toLowerCase() && _this.onchange){
			_this.onchange($text, $el, true);
		}
		if(!values.multiSelect){
			$text.val(html);
		}
		else{
			setSuggestionViewerItem({name: html, id: $el.data('id')});
			$text.val('');
		}
		hideSuggestions();

	}

	/**
	 * Shows the suggestions
	 * @constructor
	 * @param {object} e - event
	 */
	function showSuggestions(e){
		if($elem.find(suggestionsContainerClass).css('display') !== 'none'){
			return;
		}
		if(e){
			filterSuggestions($(e.currentTarget));
		}
		$elem.find(suggestionsContainerClass).show();
	}

	function toggleSuggestions(e){
		if(e){
			filterSuggestions($(e.currentTarget), true);
		}
		var $suggestionsContainer = $elem.find(suggestionsContainerClass);
		if($suggestionsContainer.css('display') !== "none"){
			$suggestionsContainer.hide();
		}
		else{
			$('.combobox').not($elem).find(suggestionsContainerClass).hide();
			$suggestionsContainer.show();
		}
	}
	/**
	 * Hides the suggestions
	 * @constructor
	 * @param {boolean} dontFocus - This will be true if the textbox shouldn't be focussed.
	 */
	function hideSuggestions(dontFocus){
		$elem.find(suggestionsContainerClass).hide();
		if(!dontFocus){
			focusInputTextBox();
		}
	}

	/*
	 * Focuses the textBox
	 * @constructor
	 */
	function focusInputTextBox(){
		$elem.find('input').focus();
	}

	/**
	 * Triggers whenever user presses a keyboard key.
	 * <br><b>Code explanation:</b> Handles keys to navigate the items up or down and 
	 * when pressed 'Enter', the selected item will be added to the textbox.
	 * @constructor
	 * @param {object} e - represents key pressed event.
	 */
	function keyOperations(e){
		var keyCode = e.keyCode || e.which;
		var el = $(e.currentTarget);
		// 'UP' Key pressed
		if(code.up == keyCode){
			var active = $elem.find(dot + values.hoveredElement);

			if(active.length){

				var selectables = $elem.find(dot + values.listClass);

				for(var i = 0; i < selectables.length; i++){
					var s = selectables.eq(i);
					if(s[0] === active[0]){
						var k = i - 1;
						if(k >= 0 && k < selectables.length){
							selectables.eq(k).addClass(values.hoveredElement);
						}
						else{
							selectables.eq(selectables.length-1).addClass(values.hoveredElement);
						}
						active.removeClass(values.hoveredElement);
					}
				}
			}
			else{
				$elem.find(dot + values.listClass).last().addClass(values.hoveredElement);
			}
			showActiveItemTop();
		}
		// 'DOWN' key pressed
		else if(code.down === keyCode){
			var active = $elem.find(dot + values.hoveredElement);

			if(active.length){

				var selectables = $elem.find(dot + values.listClass);

				for(var i = 0; i < selectables.length; i++){
					var s = selectables.eq(i);
					if(s[0] === active[0]){
						var k = i + 1;
						if(k >= selectables.length){
							selectables.eq(0).addClass(values.hoveredElement);
						}
						else{
							selectables.eq(k).addClass(values.hoveredElement);
						}
						active.removeClass(values.hoveredElement);
					}
				}
			}
			else{
				$elem.find(dot + values.listClass).first().addClass(values.hoveredElement);
			}
			showActiveItemDown();
		}
		// 'ENTER' Key pressed
		else if(code.enter === keyCode){
			var $active = $elem.find(dot + values.listClass + dot + values.hoveredElement);
			if($active.length && $active.is(':visible')){
				insertData($active);
			}
			else{
				showSuggestions();
			}
		}
		// For other key pressed, just filter the suggestions.
		else{
			filterSuggestions(el);
		}
	}
	function showActiveItemTop(){
		var $activeItem = $elem.find(dot + values.hoveredElement);
		var $suggestionsContainer = $elem.find(dot + values.suggestionsContainer);
		var top = $activeItem.position().top;
		var actualTop = top + $suggestionsContainer.scrollTop();
		$suggestionsContainer.scrollTop(actualTop);
	}
	function showActiveItemDown(){
		var $activeItem = $elem.find(dot + values.hoveredElement);
		var $suggestionsContainer = $elem.find(dot + values.suggestionsContainer);
		var top = $activeItem.position().top;
		var actualTop = top + $suggestionsContainer.scrollTop();
		if(actualTop === 0){
			$suggestionsContainer.scrollTop(0);
		}
		else if(actualTop >= $suggestionsContainer.height()){
			$suggestionsContainer.scrollTop($activeItem.outerHeight() + $suggestionsContainer.scrollTop());
		}
	}
	/*
	 * Styles the hovered item (parent or child).
	 * @constructor
	 * @param: 'e' represents the Mouse hovered event
	 */
	function makeActive(e){
		var el = $(e.currentTarget);
		$elem.find(dot + values.hoveredElement).removeClass(values.hoveredElement);
		el.addClass(values.hoveredElement);
	}

	/**
	 * Filters the suggestions based on the entered text in textbox.
	 * <br><b>Code explanation:</b> 'query' represents textbox value (with no colon)
	 * 'queryString' represents parent item textbox value (before colon)
	 * 'subQuery' represents child item's textbox value (after colon)
	 * @constructor
	 * @param {object} el - represent jquery dom element object.
	 */
	function filterSuggestions(el, blnSuggestions){
		if(!blnSuggestions){
			showSuggestions();
		}
		var query = el.val().toLowerCase();
		for(var i = 0; i< suggestions.length; i++){
			var p = suggestions[i];
			if(p.name.toLowerCase().indexOf(query) < 0){
				p.excludeParent = true;
			}
			else{
				p.excludeParent = false;	
			}
		}
		renderSuggestions(elem, suggestions, el.get(0));

		// Preparing change event call
		var $selecteds = $elem.find('.selectable').filter(function(){
			return query === this.innerHTML.toLowerCase();
		});
		// Calling change event
		if(_this.onchange){
			_this.onchange(el, $selecteds, !!$selecteds.length);
		}
	}

	/**
	 * Renders the suggestions dynamically when user shows/hides the child items
	 * or when user press any key (by focussing on input textbox).
	 * 'list' represents the object data holding all parent items and child items with initialized flags:
	 * 'excludeParent', 'excludeChildren' and 'excludeChild' flags.
	 * @constructor
	 * @param {object} el - represents the element in which the suggestions are to be rendered.
	 */
	function renderSuggestions(el, list, textBox){
		if(!el){
			return;
		}
		var $suggestionsViewer = $elem.find(".suggestions-viewer");
		var newList = _.cloneDeep(list);
		if($suggestionsViewer.length){
			$suggestionsViewer.find('.sv-item').each(function(){
				for(var i=0;i<newList.length;i++){
					if(newList[i].name.toLowerCase() === this.textContent.toLowerCase()){
						newList.splice(i,1);
					}
				}
			});
		}
		if(newList){
			var ul = document.createElement('ul');

			for(var i=0; i< newList.length; i++){
				var project = newList[i];
				if(!project.excludeParent){
					var projectHeadingWrapper = document.createElement('div');

					projectHeadingWrapper.className = values.listClass;
					projectHeadingWrapper.onmouseover = makeActive;
					projectHeadingWrapper.innerHTML = project.name;
					projectHeadingWrapper.setAttribute('data-id', project.id);
					projectHeadingWrapper.onclick = insertData;
					projectHeadingWrapper.name = project.id;

					var li = document.createElement('li');
					li.appendChild(projectHeadingWrapper);

					ul.appendChild(li);
				}
			}
			if(!textBox){
				var suggestionsViewer = document.createElement('div');
				var comboboxWrapper = document.createElement('div');
				var suggestionsContainer = document.createElement('div');
				suggestionsViewer.className = "suggestions-viewer";
				suggestionsContainer.className = values.suggestionsContainer;
				comboboxWrapper.className = "combobox-wrapper";
				textBox = document.createElement('input');
				textBox.setAttribute('type', 'text');
				if(values.disabled){
					textBox.setAttribute('disabled', true);
				}
				//event
				textBox.onclick = toggleSuggestions;
				textBox.onkeyup = keyOperations;
				suggestionsContainer.appendChild(ul);
				comboboxWrapper.appendChild(textBox);
				comboboxWrapper.appendChild(suggestionsContainer);
				el.appendChild(comboboxWrapper);
				el.appendChild(suggestionsViewer);
			}
			else{
				$elem.find(dot + values.suggestionsContainer).html('');
				$elem.find(dot + values.suggestionsContainer).get(0).appendChild(ul);
			}
			// textBox.value = txtValue;
			if(!newList.length){
				textBox.placeholder = "No items to choose";
			}else{
				textBox.placeholder = values.placeholder;
			}
			// textBox.focus();
		}
	}
	function setSuggestionViewerItem(s){
		var svItem = document.createElement('div');
		svItem.className = "sv-item";
		var svName = document.createElement('div');
		svName.innerHTML = s.name;
		svName.className = "sv-name";
		svName.setAttribute('data-id', s.id)
		var svClose = document.createElement('div');
		svClose.className = "sv-close";
		svClose.onclick = function(e){
			var el = e.currentTarget;
			$(el.parentElement).remove();
		}
		svItem.appendChild(svName);
		svItem.appendChild(svClose);
		$elem.find('.suggestions-viewer').append($(svItem));
	}

	function renderSelectedItems(){
		var key = $elem.parent().data('name');
		if(key){
			var selectedItems = Kenseo.popup.data[key];
			if(selectedItems){
				var $suggestionsViewer = $elem.find('.suggestions-viewer');
				for(var i=0; i< selectedItems.length; i++){
					setSuggestionViewerItem(selectedItems[i]);
				}
			}
		}
	}

	renderSelectedItems();
}
